import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})

export class SignComponent {
  constructor (private localStore: LocalService, private route : ActivatedRoute, private router : Router) {}

  text = {
    user: 'Username',
    name_req: 'Name is required.',
    pass: 'Password',
    pass_req: 'Password is required.',
    sign: 'Sign Up'
  };

  login : string = '';
  password : string = '';

  loginError : boolean = false;
  passwordError : boolean = false;

  createNewUser () : void {
    if (!this.localStore.getData(this.login)) {
      // can create a new user;
      if (this.login != '' && this.password != '') {
        // add login and pswd to local storage
        this.localStore.saveData(this.login, this.password);
        this.router.navigate(['/home'], { queryParams: { UserLogin: this.login } });
      } else {
        // based on state change required state of login and password
        this.loginError = true ? this.login === '' : false;
        this.passwordError = true ? this.password === '' : false;
      }
    } else {
      // user already in store so alert
      alert('Login already used');
    }
  }
}

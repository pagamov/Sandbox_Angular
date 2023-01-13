import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private localStore: LocalService, private route : ActivatedRoute, private router : Router) {}

  login : string = '';
  password : string = '';

  loginError : boolean = false;
  passwordError : boolean = false;

  logIn() : void {
    if (this.localStore.getData(this.login) == this.password) {
      // local store contains login and psw
      this.router.navigate(['/home'], { queryParams: { UserLogin: this.login } });
    } else if (this.localStore.getData(this.login) == null) {
      if (this.login == '' || this.password == '') {
        this.loginError = true ? this.login == '' : false;
        this.passwordError = true ? this.password == '' : false;
      } else {
        alert('No user with this login');
      }
    } else {
      // password incorect
      alert('Incorect password');
    }
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../local.service';
import { Text } from '../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles.css']
})

export class LoginComponent {
  public text = Text.login;
  public login : string = '';
  public password : string = '';
  public loginError : boolean = false;
  public passwordError : boolean = false;

  constructor (private localStore: LocalService, private route : ActivatedRoute, private router : Router) {}

  private hash1 () : string {
    const v = '0123456789abcdefghigklmnopqrstuvwxyz'.split('');
    let res : string = '';
    for (let i = 0; i < 10; i++) {
      res += v[Math.floor(Math.random()*v.length)];
    }
    return res;
  }

  public logIn () : void {
    if (this.localStore.getData(this.login) === this.password) {
      const token = this.hash1();
      this.localStore.saveData(token, 'true');
      this.router.navigate(['/home'], { queryParams: { UserLogin: this.login, token: token } });
    } else if (this.localStore.getData(this.login) == null) {
      if (this.login === '' || this.password === '') {
        this.loginError = true ? this.login === '' : false;
        this.passwordError = true ? this.password === '' : false;
      } else {
        alert('No user with this login');
      }
    } else {
      alert('Incorect password');
    }
  }
}

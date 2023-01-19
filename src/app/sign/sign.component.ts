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
    name: 'Your name',
    name_req: 'Nane is required.',
    user: 'Login',
    user_req: 'Login is required.',
    pass: 'Password',
    pass_req: 'Password is required.',
    sign: 'Sign Up'
  };

  name : string = '';
  login : string = '';
  password : string = '';

  nameError: boolean = false;
  loginError : boolean = false;
  passwordError : boolean = false;

  hash1() : string {
    const v = '0123456789abcdefghigklmnopqrstuvwxyz'.split('');
    let res : string = '';
    for (let i = 0; i < 10; i++) {
      res += v[Math.floor(Math.random()*v.length)];
    }
    return res;
  }

  createNewUser () : void {
    if (!this.localStore.getData(this.login)) {
      if (this.login != '' && this.password != '' && this.name != '') {
        const token = this.hash1();
        this.localStore.saveData(token, 'true');
        this.localStore.saveData(this.login, this.password);
        this.localStore.saveData(this.login + 'name', this.name);
        this.localStore.saveData(this.login + 'data', JSON.stringify([{description: 'Ваш первый таск!', priority: 'Укажите важность задачи!', time: 'Тут можно поставить время!'}]));
        this.router.navigate(['/home'], { queryParams: { UserLogin: this.login, token: token } });
      } else {
        this.loginError = true ? this.login === '' : false;
        this.passwordError = true ? this.password === '' : false;
        this.nameError = true ? this.name === '' : false;
      }
    } else if (this.localStore.getData(this.login) === this.password) {
      const token = this.hash1();
      this.localStore.saveData(token, 'true');
      this.router.navigate(['/home'], { queryParams: { UserLogin: this.login, token: token } });
    } else {
      alert('Login already used');
    }
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../local.service';

import { Text } from '../app.component'

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['../../styles.css']
})

export class SignComponent {
  public text = Text.sign;
  public name : string = '';
  public login : string = '';
  public password : string = '';
  public nameError: boolean = false;
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

  public createNewUser () : void {
    if (!this.localStore.getData(this.login)) {
      if (this.login != '' && this.password != '' && this.name != '') {
        const token = this.hash1();
        this.localStore.saveData(token, 'true');
        this.localStore.saveData(this.login, this.password);
        this.localStore.saveData(this.login + 'name', this.name);
        const def_arr = [{description: 'Ваш первый таск!', priority: 'Укажите важность задачи!', time: 'Тут можно поставить время!', tags: ['']}];
        this.localStore.saveData(this.login + 'data', JSON.stringify(def_arr));
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

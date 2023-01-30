import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../local.service';

import { Text } from '../app.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['../../styles.css']
})

export class SignComponent {
  public text = Text.sign;
  public nameError: boolean = false;
  public loginError : boolean = false;
  public passwordError : boolean = false;
  public formSign : FormGroup;


  constructor (private localStore: LocalService, private route : ActivatedRoute, private router : Router, fb : FormBuilder) {
    this.formSign = fb.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  private hash1 () : string {
    const v = '0123456789abcdefghigklmnopqrstuvwxyz'.split('');
    let res : string = '';
    for (let i = 0; i < 10; i++) {
      res += v[Math.floor(Math.random()*v.length)];
    }
    return res;
  }

  public createNewUser () : void {
    if (!this.localStore.getData(this.formSign.get('login')?.value)) {
      if (this.formSign.get('login')?.value != '' && this.formSign.get('password')?.value != '' && this.formSign.get('name')?.value != '') {
        const token = this.hash1();
        this.localStore.saveData(token, 'true');
        this.localStore.saveData(this.formSign.get('login')?.value, this.formSign.get('password')?.value);
        this.localStore.saveData(this.formSign.get('login')?.value + 'name', this.formSign.get('name')?.value);
        const def_arr = [{description: 'Ваш первый таск!', priority: 'Укажите важность задачи!', time: 'Тут можно поставить время!', tags: []}];
        this.localStore.saveData(this.formSign.get('login')?.value + 'data', JSON.stringify(def_arr));
        this.router.navigate(['/home'], { queryParams: { UserLogin: this.formSign.get('login')?.value, token: token } });
      } else {
        this.loginError = true ? this.formSign.get('login')?.value === '' : false;
        this.passwordError = true ? this.formSign.get('password')?.value === '' : false;
        this.nameError = true ? this.formSign.get('name')?.value === '' : false;
      }
    } else if (this.localStore.getData(this.formSign.get('login')?.value) === this.formSign.get('password')?.value) {
      const token = this.hash1();
      this.localStore.saveData(token, 'true');
      this.router.navigate(['/home'], { queryParams: { UserLogin: this.formSign.get('login')?.value, token: token } });
    } else {
      alert('Login already used');
    }
    this.formSign.reset();
  }
}

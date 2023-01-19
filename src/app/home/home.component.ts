import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalService } from '../local.service';

enum arrors {up = '↑', down = '↓', def = '○'};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor (private localStore: LocalService, private route : ActivatedRoute, private router : Router, fb: FormBuilder) {
    this.form_create = fb.group({
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
    this.form_change = fb.group({
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }

  // timeValidator(time: RegExp): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const forbidden = time.test(control.value);
  //     return forbidden ? {forbiddenName: {value: control.value}} : null;
  //   };
  // }

  text = {
    welcome: 'Welcome',
    needlogin: 'You need to be logged in!',
    cwith: 'Create with',
    modal: 'modal form',
    reactive: 'reactive form',
    task: 'Task',
    priority: 'Priority',
    time: 'Time',
    edit: 'Editing with',
    delete: 'Deleting',
    del: 'delete',
    submit: 'Submit',
    tags: 'Категории',
    tag_def_opt: 'Pick a tag',
    prio_def_opt: 'Change a priority'
  };

  options = ['Важно', 'Важно но лень', 'Не важно'];
  tags = ['Работа', 'Дом', 'Семья', 'Здоровье'];
  form_create: FormGroup;
  form_change : FormGroup;
  t : string = '';
  name : string = '';
  login : string = '';
  token : string = '';
  logged : boolean = false;
  sorted = [arrors.def, arrors.def, arrors.def];
  createVisible : boolean = false;
  changeVisible : boolean = false;
  changePriorityVisible : boolean = false;
  toBeChanged : number = -1;
  
  tasks = [{description: '', priority: '', time: '', tags: ['']}];


  ngOnInit () {
    // taking params from URL query; mosty from log and sign pages via RouterChange
    this.route.queryParamMap.subscribe(params => {
        this.login = params.get('UserLogin') || '';
        this.token = params.get('token') || '';
      }
    );
    
    if (this.login != '' && this.localStore.getData(this.token) === 'true') {
      this.logged = true;
      this.name = this.localStore.getData(this.login + 'name') || '';
      this.tasks = JSON.parse(this.localStore.getData(this.login + 'data') || '');
      this.t = JSON.stringify(this.tasks);
    }

    // this.localStore.clearData();
  }

  ngDoCheck () {}

  ngOnDestroy () {
    this.logged = false;
    if (this.token != '' && this.localStore.getData(this.token) === 'true') {
      this.localStore.saveData(this.token, 'false');
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    }
  }

  sortTasks (item : string) : void {
    switch (item) {
      case 'Task':
        this.sorted[1] = arrors.def; this.sorted[2] = arrors.def;
        function cmp1 (a : {description: string}, b : {description: string}) {return a.description < b.description ? -1 : (a.description > b.description ? 1 : 0)}
        switch (this.sorted[0]) {
          case arrors.def:
            this.tasks.sort(cmp1);
            this.sorted[0] = arrors.down;
            break;
          case arrors.down:
            this.tasks.sort(cmp1).reverse();
            this.sorted[0] = arrors.up;
            break;
          case arrors.up:
            this.sorted[0] = arrors.def;
            this.tasks = JSON.parse(this.localStore.getData(this.login + 'data') || '');
        }
        break;
      case 'Priority':
        this.sorted[0] = arrors.def; this.sorted[2] = arrors.def;
        function cmp2 (a : {priority: string}, b : {priority: string}) {return a.priority < b.priority ? -1 : (a.priority > b.priority ? 1 : 0)}
        switch (this.sorted[1]) {
          case arrors.def:
            this.tasks.sort(cmp2);
            this.sorted[1] = arrors.down;
            break;
          case arrors.down:
            this.tasks.sort(cmp2).reverse();
            this.sorted[1] = arrors.up;
            break;
          case arrors.up:
            this.sorted[1] = arrors.def;
            this.tasks = JSON.parse(this.localStore.getData(this.login + 'data') || '');
        }
        break;
      case 'Time':
        this.sorted[0] = arrors.def; this.sorted[1] = arrors.def;
        function cmp3 (a : {time: string}, b : {time: string}) {return a.time < b.time ? -1 : (a.time > b.time ? 1 : 0)}
        switch (this.sorted[2]) {
          case arrors.def:
            this.tasks.sort(cmp3);
            this.sorted[2] = arrors.down;
            break;
          case arrors.down:
            this.tasks.sort(cmp3).reverse();
            this.sorted[2] = arrors.up;
            break;
          case arrors.up:
            this.sorted[2] = arrors.def;
            this.tasks = JSON.parse(this.localStore.getData(this.login + 'data') || '');
        }
    }
  }

  addTag (i : number, tag : string) : void {
    if (tag != this.text.tag_def_opt && !this.tasks[i].tags.includes(tag)) {
      this.tasks[i].tags.push(tag);
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    }
  }

  deleteTag (i : number, j : number) {
    this.tasks[i].tags.splice(j, 1);
    this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
  }

  changePriority (i : number, prio : string) {
    if (prio != this.text.prio_def_opt) {
      this.tasks[i].priority = prio;
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    }
  }

  createModal () : void {

  }

  createReactive () : void {
    this.tasks.push({ description: this.form_create.value.description, 
                      priority: this.form_create.value.priority, 
                      time: this.form_create.value.time,
                      tags: ['']});
    this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    this.form_create.reset();
    this.createVisible = false;
  }

  changeModal (i : number) : void {

  }

  changeReactive (i : number) : void {
    if (i >= 0 && i < this.tasks.length) {
      this.tasks[i] = { description: this.form_change.value.description, 
                        priority: this.form_change.value.priority, 
                        time: this.form_change.value.time,
                        tags: this.tasks[i].tags}
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
      this.form_change.reset();
      this.changeVisible = false;
      this.toBeChanged = -1;
    }
  }

  deleteItem (i : number) : void {
    if (confirm('You want to delete?')) {
      this.tasks.splice(i, 1);
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    }
  }
}

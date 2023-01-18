import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { MatBasicComponent } from './ng-material/mat-basic/mat-basic.component';

import { LocalService } from '../local.service';

enum arrors {up = '↑', down = '↓', def = '○'};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor (private localStore: LocalService, private route : ActivatedRoute, private router : Router) {}

  text = {
    needlogin: 'You need to be logged in!',
    cwith: 'Create with',
    modal: 'modal form',
    reactive: 'reactive form',
    task: 'Task',
    priority: 'Priority',
    time: 'Time',
    edit: 'Editing with',
    delete: 'Deleting',
    del: 'delete'
  };

  login : string = '';
  logged : boolean = true; // then change to false and repair token 
  sorted = [arrors.def, arrors.def, arrors.def];

  tasks = [
    {description: 'Погулять с собакой', priority: 'Важно но лень', time: '06:00'},
    {description: 'Дописать функционал', priority: 'Важно', time: '12:15'},
    {description: 'Выпить воды', priority: 'Не важно', time: '21:00'},
    {description: 'Выучить как отцентровать div', priority: 'Важно', time: '00:00'}
  ];

  options = [
    'Важно', 'Важно но лень', 'Не важно'
  ];

  ngOnInit () {
    // taking params from URL query; mosty from log and sign pages via RouterChange
    this.route.queryParamMap.subscribe(params => {
        this.login = params.get('UserLogin') || '';
        if (this.login != '') {
          this.logged = true;
        }
      }
    );
  }

  sortTasks(item : string) : void {
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
            // take copy of tasks from local store
            this.sorted[0] = arrors.def;
        }
        break;
      case 'Priority':
        this.sorted[0] = arrors.def; this.sorted[2] = arrors.def;
        // need to take care of priority (now its working because of me having great luck :D)
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
            // take copy of tasks from local store
            this.sorted[1] = arrors.def;
        }
        break;
      case 'Time':
        this.sorted[0] = arrors.def; this.sorted[1] = arrors.def;
        // change time to Date and change comp function
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
            // take copy of tasks from local store
            this.sorted[2] = arrors.def;
        }
    }
  }

  createModal() : void {

  }

  createReactive() : void {

  }

  changeModal(item : {}, i : number) : void {

  } 

  changeReactive(item : {}, i : number) : void {

  }

  deleteItem(i : number) : void {
    if (confirm('You wont to delete?')) {
      this.tasks.splice(i, 1); 
    }
  }
}

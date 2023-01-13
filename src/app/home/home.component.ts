import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { MatBasicComponent } from './ng-material/mat-basic/mat-basic.component';

import { LocalService } from '../local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor (private localStore: LocalService, private route : ActivatedRoute, private router : Router) {}

  login : string = '';
  logged : boolean = true; // then change to false and repair token 
  arrors = {up: '↑', down: '↓', def: '○'};
  sorted = ['○', '○', '○'];

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
    if (item == 'Task') {
      this.sorted[1] = '○'; this.sorted[2] = '○';
      if (this.sorted[0] == '○') {
        this.tasks.sort((a : {description: string}, b : {description: string}) => a.description < b.description ? -1 : (a.description > b.description ? 1 : 0));
        this.sorted[0] = '↓';
      } else if (this.sorted[0] == '↓') {
        this.tasks.sort((a : {description: string}, b : {description: string}) => a.description < b.description ? -1 : (a.description > b.description ? 1 : 0)).reverse();
        this.sorted[0] = '↑';
      } else if (this.sorted[0] == '↑') {
        // take copy of tasks from local store
        this.sorted[0] = '○';
      }
    } else if (item == 'Priority') {
      this.sorted[0] = '○'; this.sorted[2] = '○';
      // need to take care of priority (now its working because of me having great luck :D)
      if (this.sorted[1] == '○') {
        this.tasks.sort((a : {priority: string}, b : {priority: string}) => a.priority < b.priority ? -1 : (a.priority > b.priority ? 1 : 0));
        this.sorted[1] = '↓';
      } else if (this.sorted[1] == '↓') {
        this.tasks.sort((a : {priority: string}, b : {priority: string}) => a.priority < b.priority ? -1 : (a.priority > b.priority ? 1 : 0)).reverse();
        this.sorted[1] = '↑';
      } else if (this.sorted[1] == '↑') {
        // take copy of tasks from local store
        this.sorted[1] = '○';
      }
    } else if (item == 'Time') {
      this.sorted[0] = '○'; this.sorted[1] = '○';
      // change time to Date and change comp function
      if (this.sorted[2] == '○') {
        this.tasks.sort((a : {time: string}, b : {time: string}) => a.time < b.time ? -1 : (a.time > b.time ? 1 : 0));
        this.sorted[2] = '↓';
      } else if (this.sorted[2] == '↓') {
        this.tasks.sort((a : {time: string}, b : {time: string}) => a.time < b.time ? -1 : (a.time > b.time ? 1 : 0)).reverse();
        this.sorted[2] = '↑';
      } else if (this.sorted[2] == '↑') {
        // take copy of tasks from local store
        this.sorted[2] = '○';
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

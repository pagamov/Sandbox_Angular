import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalService } from '../local.service';
import { Text, Arrors as arrors, Options, Tags } from '../app.component'

import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { ChangeDialogComponent } from './change-dialog/change-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../styles.css']
})
export class HomeComponent {
  constructor (private localStore: LocalService, private route : ActivatedRoute, private router : Router, fb: FormBuilder, public dialog: MatDialog, public dialog_change: MatDialog) {
    this.formCreate = fb.group({
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
    this.formChange = fb.group({
      description: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }

  public text = Text.home;
  public options = Options;
  public tags = Tags;
  public formCreate: FormGroup;
  public formChange : FormGroup;
  public name = new BehaviorSubject<string>('');
  private login = new BehaviorSubject<string>('');
  private token = new BehaviorSubject<string>('');
  public logged : boolean = false;
  public sorted = [arrors.def, arrors.def, arrors.def];
  public createVisible : boolean = false;
  public changeVisible : boolean = false;
  public changePriorityVisible : boolean = false;
  public toBeChanged : number = -1;
  public tasks = [{description: '', priority: '', time: '', tags: ['']}];
  private descriptionModalCreate = new BehaviorSubject<string>('');
  private priorityModalCreate = new BehaviorSubject<string>('');
  private timeModalCreate = new BehaviorSubject<string>('');


  ngOnInit () : void {
    this.route.queryParamMap.subscribe(params => {
        this.login.next(params.get('UserLogin') || '');
        this.token.next(params.get('token') || '');
      }
    );
    if (this.login.getValue() != '' && this.localStore.getData(this.token.getValue()) === 'true') {
      this.logged = true;
      this.name.next(this.localStore.getData(this.login + 'name') || '');
      this.tasks = JSON.parse(this.localStore.getData(this.login + 'data') || '');
    }
  }

  ngOnDestroy () : void {
    this.logged = false;
    if (this.token.getValue() != '' && this.localStore.getData(this.token.getValue()) === 'true') {
      this.localStore.saveData(this.token.getValue(), 'false');
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    }
  }

  public sortTasks (item : string) : void {
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

  public addTag (i : number, tag : string) : void {
    if (tag != this.text.tag_def_opt && !this.tasks[i].tags.includes(tag)) {
      this.tasks[i].tags.push(tag);
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    }
  }

  public deleteTag (i : number, j : number) : void {
    this.tasks[i].tags.splice(j, 1);
    this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
  }

  public changePriority (i : number, prio : string) : void {
    if (prio != this.text.prio_def_opt) {
      this.tasks[i].priority = prio;
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    }
  }

  public createModal () : void {
    const DialogRef = this.dialog.open(CreateDialogComponent, {
      data: { description: '',
              priority: '',
              time: ''},
    });

    DialogRef.afterClosed().subscribe(result => {
      this.descriptionModalCreate.next(result.description);
      this.priorityModalCreate.next(result.priority);
      this.timeModalCreate.next(result.time);

      this.tasks.push({ description: this.descriptionModalCreate.value, 
                        priority: this.priorityModalCreate.value, 
                        time: this.timeModalCreate.value,
                        tags: ['']});
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
      this.formCreate.reset();
    })
  }

  public createReactive () : void {
    this.tasks.push({ description: this.formCreate.value.description, 
                      priority: this.formCreate.value.priority, 
                      time: this.formCreate.value.time,
                      tags: ['']});
    this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    this.formCreate.reset();
    this.createVisible = false;
  }

  public changeModal (i : number) : void {
    const DialogRef = this.dialog_change.open(ChangeDialogComponent, {
      data: { description: '',
              priority: '',
              time: ''},
    });

    DialogRef.afterClosed().subscribe(result => {
      this.descriptionModalCreate.next(result.description);
      this.priorityModalCreate.next(result.priority);
      this.timeModalCreate.next(result.time);

      this.tasks[i] = { description: this.descriptionModalCreate.value, 
                        priority: this.priorityModalCreate.value, 
                        time: this.timeModalCreate.value,
                        tags: this.tasks[i].tags};
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
      this.formChange.reset();
    })
  }

  public changeReactive (i : number) : void {
    if (i >= 0 && i < this.tasks.length) {
      this.tasks[i] = { description: this.formChange.value.description, 
                        priority: this.formChange.value.priority, 
                        time: this.formChange.value.time,
                        tags: this.tasks[i].tags}
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
      this.formChange.reset();
      this.changeVisible = false;
      this.toBeChanged = -1;
    }
  }

  public deleteItem (i : number) : void {
    if (confirm('You want to delete?')) {
      this.tasks.splice(i, 1);
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks));
    }
  }
}

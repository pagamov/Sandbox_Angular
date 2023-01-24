import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import 'rxjs/add/operator/first';
import { first, take } from 'rxjs/operators';
import { LocalService } from '../local.service';
import { Text, Arrors as arrors, Options, Tags, Task } from '../app.component'

import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { ChangeDialogComponent } from './change-dialog/change-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public text = Text.home;
  public options = Options;
  public tags = Tags;
  public formCreate: FormGroup;
  public formChange : FormGroup;
  public logged : boolean = false;
  public sorted = [arrors.def, arrors.def, arrors.def];
  public createVisible : boolean = false;
  public changeVisible : boolean = false;
  public changePriorityVisible : boolean = false;
  public toBeChanged : number = -1;
  public tasks = new BehaviorSubject<Task[]>([{description: '', priority: '', time: '', tags: ['']}]);
  public name = new BehaviorSubject<string>('');
  public login = new BehaviorSubject<string>('');
  public token = new BehaviorSubject<string>('');

  constructor (private ref : ChangeDetectorRef, private localStore: LocalService, private route : ActivatedRoute, fb: FormBuilder, public dialog: MatDialog, public dialog_change: MatDialog) {
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

  ngOnInit () : void {
    this.route.queryParamMap.subscribe(params => {
        this.login.next(params.get('UserLogin') || '');
        this.token.next(params.get('token') || '');
      }
    );
    if (this.login.getValue() != '' && this.localStore.getData(this.token.getValue()) === 'true') {
      this.logged = true;
      this.name.next(this.localStore.getData(this.login + 'name') || '');
      this.tasks.next(JSON.parse(this.localStore.getData(this.login + 'data') || ''));
    }
  }

  ngOnDestroy () : void {
    this.logged = false;
    if (this.token.getValue() != '' && this.localStore.getData(this.token.getValue()) === 'true') {
      this.localStore.saveData(this.token.getValue(), 'false');
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
    }
  }

  public sortTasks (item : string) : void {
    switch (item) {
      case 'Task':
        this.sorted[1] = arrors.def; this.sorted[2] = arrors.def;
        function cmp1 (a : {description: string}, b : {description: string}) {return a.description < b.description ? -1 : (a.description > b.description ? 1 : 0)}
        switch (this.sorted[0]) {
          case arrors.def:
            this.tasks.next(this.tasks.getValue().sort(cmp1));
            this.sorted[0] = arrors.down;
            break;
          case arrors.down:
            this.tasks.next(this.tasks.getValue().sort(cmp1).reverse());
            this.sorted[0] = arrors.up;
            break;
          case arrors.up:
            this.sorted[0] = arrors.def;
            this.tasks.next(JSON.parse(this.localStore.getData(this.login + 'data') || ''));
        }
        break;
      case 'Priority':
        this.sorted[0] = arrors.def; this.sorted[2] = arrors.def;
        function cmp2 (a : {priority: string}, b : {priority: string}) {return a.priority < b.priority ? -1 : (a.priority > b.priority ? 1 : 0)}
        switch (this.sorted[1]) {
          case arrors.def:
            this.tasks.next(this.tasks.getValue().sort(cmp2));
            this.sorted[1] = arrors.down;
            break;
          case arrors.down:
            this.tasks.next(this.tasks.getValue().sort(cmp2).reverse());
            this.sorted[1] = arrors.up;
            break;
          case arrors.up:
            this.sorted[1] = arrors.def;
            this.tasks.next(JSON.parse(this.localStore.getData(this.login + 'data') || ''));
        }
        break;
      case 'Time':
        this.sorted[0] = arrors.def; this.sorted[1] = arrors.def;
        function cmp3 (a : {time: string}, b : {time: string}) {return a.time < b.time ? -1 : (a.time > b.time ? 1 : 0)}
        switch (this.sorted[2]) {
          case arrors.def:
            this.tasks.next(this.tasks.getValue().sort(cmp3));
            this.sorted[2] = arrors.down;
            break;
          case arrors.down:
            this.tasks.next(this.tasks.getValue().sort(cmp3).reverse());
            this.sorted[2] = arrors.up;
            break;
          case arrors.up:
            this.sorted[2] = arrors.def;
            this.tasks.next(JSON.parse(this.localStore.getData(this.login + 'data') || ''));
        }
    }
  }

  public addTag (i : number, tag : string) : void {
    if (tag != this.text.tag_def_opt && !this.tasks.getValue()[i].tags.includes(tag)) {
      let tmp : Task[] = this.tasks.getValue();
      tmp[i].tags.push(tag);
      this.tasks.next(tmp);
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
    }
  }

  public deleteTag (i : number, j : number) : void {
    let tmp : Task[] = this.tasks.getValue();
    tmp[i].tags.splice(j, 1);
    this.tasks.next(tmp);
    this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
  }

  public changePriority (i : number, prio : string) : void {
    if (prio != this.text.prio_def_opt) {
      let tmp : Task[] = this.tasks.getValue();
      tmp[i].priority = prio;
      this.tasks.next(tmp);
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
    }
  }

  public createModal () : void {
    const DialogRef = this.dialog.open(CreateDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: { description: '', priority: '', time: '' }, 
    });

    DialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        let tmp : Task[] = this.tasks.getValue();
        tmp.push({ ...result,
                   tags: ['']});
        this.tasks.next(tmp);
        this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
        this.formCreate.reset();
      }
    });
  }

  public createReactive () : void {
    let tmp : Task[] = this.tasks.getValue();
    tmp.push({ ...this.formCreate.getRawValue(),
               tags: ['']});
    this.tasks.next(tmp);
    this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
    this.formCreate.reset();
    this.createVisible = false;
  }

  public changeModal (i : number) : void {
    const DialogRef = this.dialog_change.open(ChangeDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: { description: '', priority: '', time: ''},
    });

    DialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        let tmp : Task[] = this.tasks.getValue();
        tmp[i] = { ...result,
                   tags: tmp[i].tags};
        this.tasks.next(tmp);
        this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
        this.formChange.reset();
      }
    });
  }

  public changeReactive (i : number) : void {
    if (i >= 0 && i < this.tasks.getValue().length) {
      let tmp : Task[] = this.tasks.getValue();
      tmp[i] = { ...this.formChange.getRawValue(),
                 tags: tmp[i].tags}
      this.tasks.next(tmp);
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
      this.formChange.reset();
      this.changeVisible = false;
      this.toBeChanged = -1;
    }
  }

  public deleteItem (i : number) : void {
    if (confirm('You want to delete?')) {
      let tmp : Task[] = this.tasks.getValue();
      tmp.splice(i, 1);
      this.tasks.next(tmp);
      this.localStore.saveData(this.login + 'data', JSON.stringify(this.tasks.getValue()));
    }
  }
}


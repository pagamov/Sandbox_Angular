import { Component, Inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog , MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface DialogData {
  description: string;
  priority: string;
  time: string;
}

@Component({
  selector: 'dialog-overview-dialog-change',
  templateUrl: 'dialog-overview-dialog-change.html',
  providers: [DialogOverviewDialog_Change]
})
export class DialogOverviewDialog_Change {
  form_change: FormGroup;
  options = ['Важно', 'Важно но лень', 'Не важно'];

  constructor (
    public dialogRef: MatDialogRef<DialogOverviewDialog_Change>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, fb: FormBuilder
  ) {
    this.form_change = fb.group({
      description: [data.description, [Validators.required]],
      priority: [data.priority, [Validators.required]],
      time: [data.time, [Validators.required]]
    });
  }

  onNoClick () : void {
    this.dialogRef.close();
  }

  onClick () : void {
    this.dialogRef.close({  description: this.form_change.get('description')?.value,
                            priority: this.form_change.get('priority')?.value,
                            time: this.form_change.get('time')?.value});
  }
}

@Component({
  selector: 'app-change-modal',
  templateUrl: './change-modal.component.html',
  styleUrls: ['./change-modal.component.css']
})
export class ChangeModalComponent {
  constructor (public dialog: MatDialog) {}

  public openDialog () : void {
    const DialogRef = this.dialog.open(DialogOverviewDialog_Change, {
      data: {description: '', priority: '', time: ''},
    });

    DialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed', result);
    })
  }
}
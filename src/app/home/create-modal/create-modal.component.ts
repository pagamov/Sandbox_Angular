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
  selector: 'dialog-overview-dialog',
  templateUrl: 'dialog-overview-dialog.html',
  providers: [DialogOverviewDialog]
})
export class DialogOverviewDialog {
  form_create: FormGroup;
  options = ['Важно', 'Важно но лень', 'Не важно'];

  constructor (
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, fb: FormBuilder
  ) {
    this.form_create = fb.group({
      description: [data.description, [Validators.required]],
      priority: [data.priority, [Validators.required]],
      time: [data.time, [Validators.required]]
    });
  }

  onNoClick () : void {
    this.dialogRef.close();
  }

  onClick () : void {
    this.dialogRef.close({  description: this.form_create.get('description')?.value,
                              priority: this.form_create.get('priority')?.value,
                              time: this.form_create.get('time')?.value});
  }
}

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
})
export class CreateModalComponent {
  constructor (public dialog: MatDialog) {}
  public openDialog () : void {
    const DialogRef = this.dialog.open(DialogOverviewDialog, {
      data: {description: '', priority: '', time: ''},
    });

    DialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed', result);
    })
  }
}

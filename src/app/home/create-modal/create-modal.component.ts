import { Component, Inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog , MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: 'dialog-overview-dialog.html',
  providers: [DialogOverviewDialog]
})
export class DialogOverviewDialog {
  form_create: FormGroup;

  constructor (
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, fb: FormBuilder
  ) {
    this.form_create = fb.group({
      animal: [data.animal]
    });
  }

  onNoClick () : void {
    this.dialogRef.close();
  }

  onClick () : void {
    this.dialogRef.close(this.form_create.get('animal')?.value);
  }
}

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
})
export class CreateModalComponent {
  animal = new BehaviorSubject<string>('');
  name: string = '';

  constructor (public dialog: MatDialog) {}
  
  openDialog () : void {
    const DialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal.value},
    });

    DialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed', result);
      this.animal.next(result);
    })
  }
}

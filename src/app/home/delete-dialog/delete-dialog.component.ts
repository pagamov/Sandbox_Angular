import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Text, DialogData, Options } from '../../app.component'

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['../../../styles.css']
})
export class DeleteDialogComponent {
  public text = Text.delete_dialog;

  constructor (public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, fb: FormBuilder) {
  }

  public onNoClick () : void {
    this.dialogRef.close(false);
  }

  public onClick () : void {
    this.dialogRef.close(true);
  }
}

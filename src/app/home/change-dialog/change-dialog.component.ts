import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Text, DialogData, Options } from '../../app.component'

@Component({
  selector: 'app-change-dialog',
  templateUrl: './change-dialog.component.html',
  styleUrls: ['../../../styles.css']
})
export class ChangeDialogComponent {
  public formChange: FormGroup;
  public options = Options;
  public text = Text.change_dialog;

  constructor (public dialogRef: MatDialogRef<ChangeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, fb: FormBuilder) {
    this.formChange = fb.group({
      description: [data.description, [Validators.required]],
      priority: [data.priority, [Validators.required]],
      time: [data.time, [Validators.required]]
    });
  }

  public onNoClick () : void {
    this.dialogRef.close();
  }

  public onClick () : void {
    this.dialogRef.close(this.formChange.getRawValue());
  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Text, DialogData, Options } from '../../app.component'

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['../../../styles.css']
})
export class CreateDialogComponent {
  constructor (
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, fb: FormBuilder
  ) {
    this.formCreate = fb.group({
      description: [data.description, [Validators.required]],
      priority: [data.priority, [Validators.required]],
      time: [data.time, [Validators.required]]
    });
  }

  public formCreate: FormGroup;
  public text = Text.create_dialog;
  public options = Options;

  public onNoClick () : void {
    this.dialogRef.close();
  }

  public onClick () : void {
    this.dialogRef.close({  description: this.formCreate.get('description')?.value,
                              priority: this.formCreate.get('priority')?.value,
                              time: this.formCreate.get('time')?.value});
  }
}

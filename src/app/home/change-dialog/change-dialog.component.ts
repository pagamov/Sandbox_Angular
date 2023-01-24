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
  constructor (
    public dialogRef: MatDialogRef<ChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, fb: FormBuilder
  ) {
    this.formChange = fb.group({
      description: [data.description, [Validators.required]],
      priority: [data.priority, [Validators.required]],
      time: [data.time, [Validators.required]]
    });
  }

  public formChange: FormGroup;
  public options = Options;
  public text = Text.change_dialog;

  public onNoClick () : void {
    this.dialogRef.close();
  }

  public onClick () : void {
    this.dialogRef.close({  description: this.formChange.get('description')?.value,
                            priority: this.formChange.get('priority')?.value,
                            time: this.formChange.get('time')?.value});
  }
}

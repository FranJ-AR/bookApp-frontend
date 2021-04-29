import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss',
  '../../global-styles/dialog-styles.scss']
})
export class DialogErrorComponent implements OnInit {

  public title:string;
  public message:string | null = null;

  constructor(
    private dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) { 

      this.title = data.title;
      this.message = data.message;
  }

  ngOnInit(): void {
  }

  close(){

    this.dialogRef.close();

  }

}

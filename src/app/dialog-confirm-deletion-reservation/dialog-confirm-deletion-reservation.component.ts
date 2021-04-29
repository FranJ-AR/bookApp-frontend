import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-confirm-deletion-reservation',
  templateUrl: './dialog-confirm-deletion-reservation.component.html',
  styleUrls: ['./dialog-confirm-deletion-reservation.component.scss',
  '../../global-styles/dialog-styles.scss']
})
export class DialogConfirmDeletionReservationComponent implements OnInit {


  constructor( 
    private dialogRef: MatDialogRef<DialogConfirmDeletionReservationComponent>)

     { }

  ngOnInit(): void {

     
  }

  confirm(){

    this.dialogRef.close(true);

  }

  cancel(){

    this.dialogRef.close(false);
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-reservation',
  templateUrl: './dialog-confirm-reservation.component.html',
  styleUrls: ['./dialog-confirm-reservation.component.scss',
  '../../global-styles/dialog-styles.scss']
})
export class DialogConfirmReservationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogConfirmReservationComponent>) { }

  ngOnInit(): void {
  }

  confirm(){

    this.dialogRef.close(true);

  }

  cancel(){

    this.dialogRef.close(false);
  }

}



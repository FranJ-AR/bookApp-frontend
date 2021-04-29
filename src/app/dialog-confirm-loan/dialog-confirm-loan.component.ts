import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-loan',
  templateUrl: './dialog-confirm-loan.component.html',
  styleUrls: ['./dialog-confirm-loan.component.scss',
  '../../global-styles/dialog-styles.scss']
})
export class DialogConfirmLoanComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogConfirmLoanComponent>) { }

  ngOnInit(): void {
  }

  confirm(){

    this.dialogRef.close(true);

  }

  cancel(){

    this.dialogRef.close(false);
  }

}

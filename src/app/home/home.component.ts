import { Component, Inject, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { AuthService } from '../services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


export interface DialogData {
  amount: string;
  customerId: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


balance: any = 0.0;
customerId: string = "";
amount: any = 0;

constructor(
  private authService: AuthService,
  private accoutService: AccountsService,
  public dialog: MatDialog
) { }

ngOnInit(): void {
  this.customerId = localStorage.getItem('customerId') || '';
  this.getCustomerBalance();
}

//get custoimer balance
getCustomerBalance(): void {
   // Replace this with your actual customer ID
  this.accoutService.getCustomerBalance(this.customerId)
    .then((balance: any) => {
      this.balance = balance;
      console.log(this.balance);
    })
    .catch((error: any) => {
      console.error('Failed to get customer balance:', error);
    });
}

//deposit money
depositMoney(): void {
  this.accoutService.depositMoney(this.customerId, this.amount)
    .then(() => {
      this.getCustomerBalance();
    })
    .catch((error: any) => {
      console.error('Failed to deposit money:', error);
    });
}

//withdraw money
withdrawMoney(): void {
  this.accoutService.withdrawMoney(this.customerId, this.amount)
    .then(() => {
      this.getCustomerBalance();
    })
    .catch((error: any) => {
      console.error('Failed to withdraw money:', error);
    });
}

openDialog() {
  const dialogRef = this.dialog.open(DepositDialog, {
    data: {customerId: this.customerId, amount: this.amount},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.amount = result;
    console.log(this.amount);
  });}


}

@Component({
  selector: 'deposit-dialog',
  templateUrl: 'deposit-dialog.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule],
})
export class DepositDialog {
  constructor(
    public dialogRef: MatDialogRef<DepositDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
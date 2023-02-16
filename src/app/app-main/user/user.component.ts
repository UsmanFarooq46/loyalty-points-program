import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any;
  memberData: any;
  transactions = [];
  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getAllTransactionOfUser();
    this.getUserData();
  }

  getAllTransactionOfUser() {
    let payload = {
      member: {
        id: this.user._id,
      },
      loyalty_currency: 'WELLNESS-WINNERS_VBTAY',
    };
    this.service.getUserTransactions(payload).subscribe({
      next: (resp) => {
        console.log('all transactions of a user: ', resp);
        this.transactions = resp.data.results;
      },
      error: (err) => {
        console.log('error : ', err);
      },
    });
  }

  getUserData() {
    let payload = {
      loyalty_program_identifiers: {
        id: this.user._id,
      },
      loyalty_currency: 'WELLNESS-WINNERS_VBTAY',
    };
    this.service.getUserData(payload).subscribe({
      next: (resp) => {
        this.memberData = resp.data;
        console.log('resp of user DataL: ', resp);
      },
      error: (err) => {
        console.log('error in getting data of user');
      },
    });
  }
}

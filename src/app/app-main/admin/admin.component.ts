import { ToasterService } from './../../shared-services/toaster.service';
import { AdminService } from './admin.service';
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  @ViewChild('transactionModalContent') transactionModalContent!: ElementRef;

  transferAmount: number = 0;
  selectedUser: any;
  allUsers = [];
  isLoading: boolean = false;
  modalRef: NgbModalRef;
  transferReason: string = '';

  constructor(
    private service: AdminService,
    private toaster: ToasterService,
    private ngModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllTransactions();
    console.log('going to add ngRx Library in this project');
    this.getAllUser();
  }

  getAllUser() {
    this.service.getAllUser().subscribe({
      next: (resp) => {
        console.log(resp);
        this.allUsers = resp;
        const index = this.allUsers.findIndex((obj) => obj.role === 'admin');
        if (index !== -1) {
          this.allUsers.splice(index, 1);
        }
      },
      error: (err) => {
        this.toaster.openSnackBar(err.error.message || err.message);
      },
      complete: () => console.info('complete'),
    });
  }

  opensendTransactionPopup(user: any) {
    this.selectedUser = user;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    };
    this.modalRef = this.ngModal.open(
      this.transactionModalContent,
      ngbModalOptions
    );
  }

  sendPoints() {
    console.log('sending amount: ', this.transferAmount);
    if (this.transferAmount == undefined || this.transferAmount == null) {
      return;
    }
    let transaction = {
      amount: this.transferAmount,
      destination: {
        id: this.selectedUser._id,
      },
      external_reference: 'Admin Send',
      loyalty_currency: 'WELLNESS-WINNERS_VBTAY',

      loyalty_system_data: {},
      metadata: {
        user: this.selectedUser.user,
        role: this.selectedUser.role,
        email: this.selectedUser.email,
        reason: this.transferReason,
      },
      reason: 'Admin is giving points to member',
      origin: {
        id: '4edecc8b-01b6-454e-8c05-b42eba8f7fbb',
      },
    };
    this.isLoading = true;
    this.service.sendPoints(transaction).subscribe({
      next: (resp) => {
        console.log('Completed', resp);
        this.isLoading = false;
        this.modalRef.dismiss();
        this.toaster.openSnackBar(
          `Transaction of ${this.transactionModalContent} has done Successfully`
        );
      },
      error: (err) => {
        console.log('error : ', err);

        this.isLoading = false;
        this.toaster.openSnackBar(
          err.error.message?.errors[0].message || 'Transaction Error'
        );
      },
    });
  }

  getAllTransactions() {
    console.log('getting all transaction: ');
    this.service.getAllTransaction().subscribe({
      next: (resp) => {
        console.log('All transactions :', resp);
      },
      error: (err) => {
        console.log('err');
      },
    });
  }
}

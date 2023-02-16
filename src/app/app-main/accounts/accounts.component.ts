import { ToasterService } from './../../shared-services/toaster.service';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/modal/modal-config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent {
  @ViewChild('successModalContent') successModalContent!: ElementRef;
  @ViewChild('RegisterModalContent') RegisterModalContent!: ElementRef;
  loginForm: any;
  loading: boolean = false;
  isMatched: boolean = true;
  innerHeight: number = 600;
  constructor(
    // private snackBar: MatSnackBar,
    private toaster: ToasterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AccountService,
    private ngModal: NgbModal
  ) {
    // super();
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.initForm();
    this.innerHeight = window.innerHeight - 20;
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    // this.loading = true;
    this.service.Login(this.loginForm.value).subscribe({
      next: (resp) => {
        this.localStorageSet(resp);
      },
      error: (err) => {
        this.toaster.openSnackBar(err.error.message || 'Connnection Error');
      },
    });
  }

  localStorageSet(respData: any) {
    localStorage.setItem('token', respData.token);
    localStorage.setItem('user', JSON.stringify(respData.userData));
    console.log('user>>>>>>>>>>>>>>>>>>>>>>>>>>>', respData);

    if (respData.userData.role == 'admin') {
      this.router.navigate(['/admin']);
    } else this.router.navigate(['/user']);
  }

  OpenForgotPasswordPopup() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    this.ngModal.open(this.successModalContent, ngbModalOptions);
  }

  openRegisterPopup() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    this.ngModal.open(this.RegisterModalContent, ngbModalOptions);
  }
}

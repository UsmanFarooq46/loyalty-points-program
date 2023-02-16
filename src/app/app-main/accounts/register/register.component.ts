import { ToasterService } from './../../../shared-services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Output, ElementRef } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  regsiterForm: any;
  @Output() closePopup = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private toaster: ToasterService
  ) {
    this.initForm();
  }

  get form() {
    return this.regsiterForm.controls;
  }

  initForm() {
    this.regsiterForm = this.fb.group({
      user: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      role: ['member'],
    });
  }

  submitRegisterForm() {
    if (this.regsiterForm.invalid) {
      this.regsiterForm.markAllAsTouched();
      return;
    }
    console.log('form value: ', this.regsiterForm.value);
    this.service.registerMember(this.regsiterForm.value).subscribe({
      next: (resp) => {
        console.log('resp: ', resp);
        this.createMember(resp);
      },
      error: (err) => {
        this.toaster.openSnackBar(err.error.message);
        console.log('err', err);
      },
    });
  }

  createMember(user: any) {
    let memberBody = {
      country: 'USA',
      email: 'usman4609903@gmail.com',
      first_name: user.user,
      gender: 'male',
      loyalty_program_identifiers: {
        id: user._id,
      },
    };

    this.service.createMember(memberBody).subscribe({
      next: (resp) => {
        console.log('created: ', resp);
        this.closePopup.emit(true);
        this.toaster.openSnackBar('user has created ');
        this.signUpBonus(user);
      },
      error: (err) => {
        this.toaster.openSnackBar(err.error.message || 'something went wrong');
        console.log('error : ', err);
      },
    });
  }

  signUpBonus(user: any) {
    let accrual = {
      amount: 40,
      external_reference: 'Signup Bonus',
      loyalty_currency: 'WELLNESS-WINNERS_VBTAY',
      loyalty_system_data: {},
      member: {
        id: user._id,
      },
      metadata: {
        user: user.user,
        role: user.role,
        email: user.email,
        reason: 'Singup Bonus of 40 points',
      },
      origin: 'acc_l48amt068fu91',
      reason: 'Signup_bonus',
      reason_code: 'participation_check_in_reward',
    };
    this.service.diretAccrual(accrual).subscribe({
      next: (resp: any) => {
        console.log('signUp bonus: ', resp);
      },
      error: (err) => {
        console.log('err: ', err);
      },
    });

    // let transaction = {
    //   amount: 10,
    //   destination: {
    //     id: user._id,
    //   },
    //   external_reference: 'Signup Bonus',
    //   loyalty_currency: 'WELLNESS-WINNERS_VBTAY',

    //   loyalty_system_data: {},
    //   metadata: {
    //     user: user.user,
    //     role: user.role,
    //     email: user.email,
    //     reason: 'Singup Bonus of 10 points',
    //   },
    //   reason: 'SignUp_bonus',
    //   origin: {
    //     id: '4edecc8b-01b6-454e-8c05-b42eba8f7fbb',
    //   },
    //   // reason_code: 'Signup_Bonus',
    // };
    // this.service.singupBonus(transaction).subscribe({
    //   next: (resp) => {
    //     console.log('resp: ', resp);
    //   },
    //   error: (err) => {
    //     console.log('err: ', err);
    //   },
    // });
  }
}

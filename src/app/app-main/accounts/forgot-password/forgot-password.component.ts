import { AccountService } from './../account.service';
// import { AccountsService } from './../accounts.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { BaseActions } from 'src/app/shared/shared-classes/base-actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: any
  loading: boolean = false;
  @Output() changed = new EventEmitter()
  constructor(private fb: FormBuilder, private accService: AccountService) {
    // super();
    this.initForm();
  }

  initForm() {
    this.forgotPassForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPass: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  get form() {
    return this.forgotPassForm.controls
  }

  submitUserNameAndEmail() {
    if (this.forgotPassForm.invalid) {
      this.forgotPassForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.accService.sendEmailPass(this.forgotPassForm.value).subscribe(resp => {
      console.log("got resp of email and username: ", resp);
      setTimeout(() => {
        this.changed.emit(true);
      }, 2000);
    }, (err) => {
      console.log("what is in the err: ", err.error.message);
      // this.errorPopup(err.error.message)
    })
  }
}

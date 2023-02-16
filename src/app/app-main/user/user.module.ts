import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserTransactionComponent } from './user-transaction/user-transaction.component';


@NgModule({
  declarations: [
    UserComponent,
    UserTransactionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

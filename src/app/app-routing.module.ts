import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: '/accounts', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () =>
      import('./app-main/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./app-main/accounts/accounts.module').then(
        (m) => m.AccountsModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./app-main/user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

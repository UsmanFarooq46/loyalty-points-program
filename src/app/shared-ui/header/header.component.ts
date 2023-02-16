import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    console.log('toggle');
  }

  Logout() {
    console.log('log out ');
    localStorage.clear();
    this.router.navigateByUrl('/accounts')
  }
}

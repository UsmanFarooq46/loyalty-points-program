import {
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  innerHeight: number = window.innerHeight - 37;
  isLoginPage: boolean = false;
  isLoading: boolean = false;
  constructor(private router: Router) {
    console.log('window inner height: ', this.innerHeight);
    // if(this.innerHeight>)
    this.CheckRouteAndLazyLoad();
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  CheckRouteAndLazyLoad() {
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        // this.CheckingForLogin();
        if (event['url'] == '/accounts' || event['url'] == '/') {
          this.isLoginPage = true;
          console.log("event['url']", event['url']);
        } else {
          console.log("event['url']", event['url']);
          this.isLoginPage = false;
        }
      }
    });

    // Spinner for lazyload modules
    this.router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }
}

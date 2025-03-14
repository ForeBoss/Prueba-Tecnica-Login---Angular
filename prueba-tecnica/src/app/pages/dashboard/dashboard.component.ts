import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false;
  userData?: User | null;

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {
    this.LoginService.userLoginOn.subscribe((userLoginOn) => {
      this.userLoginOn = userLoginOn;
    });

    this.LoginService.userData.subscribe((userData) => {
      this.userData = userData;
    });
  }

  logout(): void {
    this.LoginService.logout();
  }
}

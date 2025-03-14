import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;

  constructor(private LoginService: LoginService) {}

  ngOnInit(): void {
    this.LoginService.userLoginOn.subscribe((status) => {
      this.userLoginOn = status;
    });
  }
  logout(): void {
    this.LoginService.logout();
  }
}

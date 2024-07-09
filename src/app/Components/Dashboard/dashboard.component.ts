import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dropdownOpen = false;
  constructor(private authService: AuthService, private router: Router) { }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .subscribe(
        response => {
          console.log('Logout successful:', response);
          this.authService.clearToken();
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error in logout:', error);
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

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

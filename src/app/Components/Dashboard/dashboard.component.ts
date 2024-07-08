import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  authToken: string | null = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authToken = this.authService.getToken();
  }
}

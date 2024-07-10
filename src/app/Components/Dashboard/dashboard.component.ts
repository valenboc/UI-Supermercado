import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  ngOnInit() { }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(
          response => {
            console.log('Logout successful:', response);
            this.authService.clearToken();
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Error in logout:', error);
            Swal.fire({
              title: 'Error',
              text: 'Error al cerrar sesión. Intente nuevamente.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      } else {
        console.log('Logout cancelado por el usuario.');
      }
    });
  }
}

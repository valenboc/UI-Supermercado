import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.resetLoginData();
  }

  resetLoginData() {
    this.loginData.email = '';
    this.loginData.password = '';
  }

  onSubmit(form: NgForm) {
    this.errorMessage = ''; 
    if (form.valid) {
      const email = this.loginData.email;
      const password = this.loginData.password;
      this.authService.login(email, password)
        .subscribe(
          response => {
            Swal.fire({
              title: '¡Éxito!',
              text: 'Inicio de sesión exitoso',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/dashboard']);
            });
          },
          error => {
            console.error('Error in login:', error);
            this.errorMessage = 'Error al iniciar sesión. Verifique sus credenciales.';
          }
        );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }

  goToRegister() {
    this.resetLoginData();
    this.router.navigate(['/register']);
  }
}

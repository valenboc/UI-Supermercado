import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.resetRegisterData();
  }

  resetRegisterData() {
    this.registerData.name = '';
    this.registerData.email = '';
    this.registerData.password = '';
    this.registerData.passwordConfirmation = '';
  }

  onSubmit(form: NgForm) {
    this.errorMessage = '';
    if (form.valid) {
      if (this.registerData.password !== this.registerData.passwordConfirmation) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }

      this.authService.register(this.registerData.name, this.registerData.email, this.registerData.password, this.registerData.passwordConfirmation)
        .subscribe(
          response => {
            console.log('Registro exitoso:', response);
            Swal.fire({
              title: '¡Éxito!',
              text: 'Registro exitoso',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/login']).then(() => {
                this.resetRegisterData();
              });
            });
          },
          error => {
            console.error('Error en el registro:', error);
            this.errorMessage = 'Error en el registro. Intente nuevamente.';
          }
        );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos.';
    }
  }

  goToLogin() {
    this.resetRegisterData();
    this.router.navigate(['/login']);
  }
}

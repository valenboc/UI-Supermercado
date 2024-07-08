import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.registerData.name, this.registerData.email, this.registerData.password, this.registerData.passwordConfirmation)
      .subscribe(
        response => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error en el registro:', error);
          // Aquí puedes manejar el error y mostrar un mensaje al usuario si es necesario
        }
      );
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password)
      .subscribe(
        response => {
          // Manejar la respuesta exitosa aquí
          console.log('Respuesta:', response);
        },
        error => {
          // Manejar errores aquí
          console.error('Error en el login:', error);
        }
      );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Login/login.component';
import { RegisterComponent } from './Components/Register/register.component';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';
import { CiudadesComponent } from './Components/Ciudades/ciudades.component'; 
import { SupermercadosComponent } from './Components/Supermercados/supermercados.component'; 
import { AuthGuard } from './Guards/auth.guard';
import { SupermercadosService } from './Services/supermercados.service';
import { ModalComponent } from './Components/Modal/modal.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'ciudades', component: CiudadesComponent, canActivate: [AuthGuard] },
  { path: 'supermercados', component: SupermercadosComponent, canActivate: [AuthGuard] } 
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CiudadesComponent,
    SupermercadosComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule,
  ],
  providers: [SupermercadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

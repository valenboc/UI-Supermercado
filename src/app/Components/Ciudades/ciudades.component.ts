import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CiudadesService } from '../../Services/ciudades.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {
  ciudades: any[] = [];
  errorMessage: string = '';
  
  @Output() cityChange = new EventEmitter<string>();

  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.fetchCiudades();
  }

  fetchCiudades(): void {
    this.ciudadesService.getCiudades().subscribe(
      data => {
        this.ciudades = data;
        console.log('Ciudades:', this.ciudades);
      },
      error => {
        console.error('Error fetching ciudades:', error);
        this.errorMessage = 'Error fetching ciudades. Please try again later.';
      }
    );
  }

  onCityChange(event: any): void {
    const selectedCity = event.target.value;
    this.cityChange.emit(selectedCity);
    console.log(selectedCity);
  }
}

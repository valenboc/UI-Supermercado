import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CiudadesService } from '../Services/ciudades.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() supermercadoEdit: any = {};
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<any>();
  ciudades: any[] = [];

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
      }
    );
  }

  close(): void {
    this.closeModal.emit();
  }

  submitForm(): void {
    this.saveChanges.emit(this.supermercadoEdit);
  }
}

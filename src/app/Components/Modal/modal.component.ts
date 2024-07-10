import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CiudadesService } from '../../Services/ciudades.service';

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
  selectedFile: File | null = null;

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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
  
    if (file && allowedTypes.includes(file.type)) {
      this.selectedFile = file;
    } else {
      console.error('Archivo no válido. Selecciona una imagen.');
      this.selectedFile = null; 
    }
  }
  

  submitForm(): void {
    const formData = new FormData();
  
    formData.append('ID_supermercado', this.supermercadoEdit.ID_supermercado);
    formData.append('Nombre', this.supermercadoEdit.Nombre);
    formData.append('NIT', this.supermercadoEdit.NIT);
    formData.append('Direccion', this.supermercadoEdit.Direccion);
    formData.append('Longitud', this.supermercadoEdit.Longitud);
    formData.append('Latitud', this.supermercadoEdit.Latitud);
    formData.append('ID_ciudad', this.supermercadoEdit.ID_ciudad);
  
    if (this.selectedFile) {
      formData.append('Logo', this.selectedFile, this.selectedFile.name);
    }
  
    this.saveChanges.emit(formData);
  }
}
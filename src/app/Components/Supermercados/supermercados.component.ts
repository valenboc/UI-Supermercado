import { Component, OnInit } from '@angular/core';
import { SupermercadosService } from '../../Services/supermercados.service';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.component.html',
  styleUrls: ['./supermercados.component.css']
})
export class SupermercadosComponent implements OnInit {
  supermercados: any[] = [];
  supermercadoEdit: any = {
    Nombre: "",
    NIT: "",
    Direccion: "",
    Logo: "",
    Longitud: "",
    Latitud: "",
    ID_ciudad: ""
  };
  isNew: boolean = false;
  page: number = 1; 
  isModalOpen: boolean = false;

  constructor(private supermercadoService: SupermercadosService) {}

  ngOnInit(): void {
    this.loadSupermercados();
  }

  loadSupermercados(): void {
    this.supermercadoService.getSupermercados().subscribe(
      (data: any[]) => {
        this.supermercados = data;
      },
      (error: any) => {
        console.error('Error al cargar supermercados:', error);
      }
    );
  }

  openEditModal(supermercado: any): void {
    this.supermercadoEdit = { 
      ...supermercado,
      ID_ciudad: supermercado.ciudad.ID_ciudad
    };
    this.isNew = false;
    this.isModalOpen = true;
  }

  openNewModal(): void {
    this.supermercadoEdit = {
      Nombre: "",
      NIT: "",
      Direccion: "",
      Logo: "",
      Longitud: "",
      Latitud: "",
      ID_ciudad: ""
    };
    this.isNew = true;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  submitForm(supermercadoEdit: any): void {
    if (this.isNew) {
      this.supermercadoService.createSupermercado(supermercadoEdit).subscribe(
        (response: any) => {
          console.log('Supermercado creado exitosamente:', response);
          this.closeModal();
          this.loadSupermercados();
        },
        (error: any) => {
          console.error('Error al crear supermercado:', error);
        }
      );
    } else {
      this.supermercadoService.editSupermercado(supermercadoEdit.ID_supermercado, supermercadoEdit).subscribe(
        (response: any) => {
          console.log('Supermercado editado exitosamente:', response);
          this.closeModal();
          this.loadSupermercados();
        },
        (error: any) => {
          console.error('Error al editar supermercado:', error);
        }
      );
    }
  }

  deleteSupermercado(supermercado: any): void {
    const confirmDelete = confirm(`¿Está seguro de que desea eliminar el supermercado ${supermercado.Nombre}?`);
    if (confirmDelete) {
      this.supermercadoService.deleteSupermercado(supermercado.ID_supermercado).subscribe(
        (response: any) => {
          console.log('Supermercado eliminado exitosamente:', response);
          this.loadSupermercados();
        },
        (error: any) => {
          console.error('Error al eliminar supermercado:', error);
        }
      );
    }
  }
}

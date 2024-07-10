import { Component, OnInit } from '@angular/core';
import { SupermercadosService } from '../../Services/supermercados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.component.html',
  styleUrls: ['./supermercados.component.css']
})
export class SupermercadosComponent implements OnInit {
  supermercados: any[] = [];
  filteredSupermercados: any[] = [];
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
  itemsPerPage: number = 10; // Número de elementos por página
  isModalOpen: boolean = false;
  searchTerm: string = '';
  selectedCity: string = '';

  constructor(private supermercadoService: SupermercadosService) {}

  ngOnInit(): void {
    this.loadSupermercados();
  }

  loadSupermercados(): void {
    this.supermercadoService.getSupermercados().subscribe(
      (data: any[]) => {
        this.supermercados = data;
        this.filteredSupermercados = data;
        this.page = Math.ceil(this.supermercados.length / this.itemsPerPage);
      },
      (error: any) => {
        console.error('Error al cargar supermercados:', error);
      }
    );
  }

  filterSupermercados(): void {
    this.filteredSupermercados = this.supermercados.filter(supermercado => {
      const matchesSearchTerm = supermercado.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCity = this.selectedCity === 'todos' || this.selectedCity === '' || supermercado.ciudad.ID_ciudad.toString() === this.selectedCity;
      return matchesSearchTerm && matchesCity;
    });
  }

  onCityChange(cityId: string): void {
    this.selectedCity = cityId;
    this.filterSupermercados();
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
          Swal.fire({
            title: '¡Éxito!',
            text: 'Supermercado creado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.closeModal();
            this.loadSupermercados();
            this.page = Math.ceil((this.supermercados.length + 1) / this.itemsPerPage); // Redirigir a la última página
          });
        },
        (error: any) => {
          console.error('Error al crear supermercado:', error);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear el supermercado',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas confirmar los cambios?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.supermercadoService.editSupermercado(supermercadoEdit.ID_supermercado, supermercadoEdit).subscribe(
            (response: any) => {
              console.log('Supermercado editado exitosamente:', response);
              Swal.fire({
                title: '¡Éxito!',
                text: 'Supermercado editado exitosamente',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                this.closeModal();
                this.loadSupermercados();
                this.supermercadoEdit.Logo = response.supermercado.Logo;
              });
            },
            (error: any) => {
              console.error('Error al editar supermercado:', error);
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al editar el supermercado',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          );
        }
      });
    }
  }

  deleteSupermercado(supermercado: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el supermercado ${supermercado.Nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supermercadoService.deleteSupermercado(supermercado.ID_supermercado).subscribe(
          (response: any) => {
            console.log('Supermercado eliminado exitosamente:', response);
            Swal.fire({
              title: '¡Eliminado!',
              text: 'Supermercado eliminado exitosamente',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.loadSupermercados();
            });
          },
          (error: any) => {
            console.error('Error al eliminar supermercado:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el supermercado',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    });
  }
}

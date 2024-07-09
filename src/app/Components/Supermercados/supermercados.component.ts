import { Component, OnInit } from '@angular/core';
import { SupermercadosService } from '../../Services/supermercados.service';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.component.html',
  styleUrls: ['./supermercados.component.css']
})
export class SupermercadosComponent implements OnInit {
  supermercados: any[] = [];
  supermercadoEdit: any = {}; // Objeto para almacenar el supermercado que se está editando
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
    this.supermercadoEdit = { ...supermercado };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  submitEditForm(supermercadoEdit: any): void {
    this.supermercadoService.editSupermercado(supermercadoEdit.id, supermercadoEdit).subscribe(
      (response: any) => {
        console.log('Supermercado editado exitosamente:', response);
        this.closeModal();
      },
      (error: any) => {
        console.error('Error al editar supermercado:', error);
      }
    );
  }

  deleteSupermercado(supermercado: any): void {
    // Lógica para eliminar el supermercado
  }
}

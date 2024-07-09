import { Component, OnInit } from '@angular/core';
import { SupermercadosService } from '../../Services/supermercados.service'; // Asegúrate de que esta ruta es correcta

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.component.html',
  styleUrls: ['./supermercados.component.css']
})
export class SupermercadosComponent implements OnInit {
  supermercados: any[] = [];
  page: number = 1; // Página inicial

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

  editSupermercado(supermercado: any): void {
    // Lógica para editar el supermercado
  }

  deleteSupermercado(supermercado: any): void {
    // Lógica para eliminar el supermercado
  }
}

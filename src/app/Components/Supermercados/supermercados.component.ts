import { Component, OnInit } from '@angular/core';
import { SupermercadosService } from '../../Services/supermercados.service';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.component.html',
  styleUrls: ['./supermercados.component.css']
})
export class SupermercadosComponent implements OnInit {
  supermercados: any[] = [];
  errorMessage: string = '';

  constructor(private supermercadosService: SupermercadosService) { }

  ngOnInit(): void {
    this.fetchSupermercados();
  }

  fetchSupermercados(): void {
    this.supermercadosService.getSupermercados().subscribe(
      data => {
        this.supermercados = data;
        console.log('Supermercados:', this.supermercados);
      },
      error => {
        console.error('Error fetching supermercados:', error);
        this.errorMessage = 'Error fetching supermercados. Please try again later.';
      }
    );
  }

  editSupermercado(supermercado: any): void {
    // Lógica para editar el supermercado
    console.log('Editando supermercado:', supermercado);
  }

  deleteSupermercado(supermercado: any): void {
    // Lógica para eliminar el supermercado
    console.log('Eliminando supermercado:', supermercado);
  }

  addSupermercado(): void {
    // Lógica para agregar un nuevo supermercado
    console.log('Agregando nuevo supermercado');
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Prenda } from '../../core/models/prenda';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PrendaService } from '../../core/services/prenda.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalPrendaComponent } from './modal-prenda/modal-prenda.component';
import { CategoriaService } from '../../core/services/categoria.service';
import { MarcaService } from '../../core/services/marca.service';
import Swal from 'sweetalert2';
import { PrendaResponse } from '../../core/models/prenda-response';

@Component({
  selector: 'app-prendas',
  templateUrl: './prendas.component.html',
  styleUrl: './prendas.component.css'
})
export class PrendasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'marca', 'categoria', 'talla', 'color', 'precio','acciones'];
  dataInicio: PrendaResponse[] = [];
  dataListaPrendas = new MatTableDataSource(this.dataInicio);
  
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private _prendaService: PrendaService, private _snackBar: MatSnackBar,
    private _categoriaService: CategoriaService, private _marcaService: MarcaService,
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getPrendas();
  }

  ngAfterViewInit(): void {
    this.dataListaPrendas.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataListaPrendas.filter = filterValue.trim().toLowerCase();
  }

  getPrendas(){
    this._prendaService.getPrendas(0, 10000).subscribe({
      next: (data) => {
        this.dataListaPrendas.data = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar las prendas', '', {
          duration: 2000
        });
      }
    });
  }
  
  createPrenda(){
    this._dialog.open(ModalPrendaComponent, {
      width: '700px',
      height: '540px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getPrendas();
      }
    });
  }
  
  updatePrenda(prenda: Prenda){
    this._dialog.open(ModalPrendaComponent, {
      width: '700px',
      height: '540px',
      disableClose: true,
      data: prenda
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getPrendas();
      }
    });
  }

  deletePrenda(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una Prenda eliminada no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        this._prendaService.deletePrenda(id).subscribe({
          next: (data) => {
            if(data){
              this.getPrendas();
              this._snackBar.open('Prenda eliminada con éxito', '', {
                duration: 2000
              });
            }
          },
          error: () => {
            this._snackBar.open('Error al eliminar la Prenda', '', {
              duration: 2000
            });
          }
        });
      }
    });
  }

}

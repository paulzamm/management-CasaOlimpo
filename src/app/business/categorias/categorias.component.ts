import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../core/models/categoria';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriaService } from '../../core/services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  dataInicio: Categoria[] = [];
  dataListaCategorias = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private _categoriaService: CategoriaService, private _snackBar: MatSnackBar,
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCategorias();      
  }

  ngAfterViewInit(): void {
    this.dataListaCategorias.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataListaCategorias.filter = filterValue.trim().toLowerCase();
  }

  getCategorias(){
    this._categoriaService.getCategorias(0, 10000).subscribe({
      next: (data) => {
        this.dataListaCategorias.data = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar las categorias', '', {
          duration: 2000
        });
      }
    });
  }

  createCategoria(){
    this._dialog.open(ModalCategoriaComponent, {
      width: '500px',
      height: '400px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getCategorias();
      }
    });
  }

  updateCategoria(categoria: Categoria){
    this._dialog.open(ModalCategoriaComponent, {
      width: '500px',
      height: '400px',
      disableClose: true,
      data: categoria
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getCategorias();
      }
    });
  }

  deleteMarca(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una Categoría eliminada no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this._categoriaService.deleteCategoria(id).subscribe({
          next: (data) =>{
            if(data){
              this.getCategorias();
              this._snackBar.open('Categoría eliminada con éxito', '', {
                duration: 2000
              });
            }
          },
          error: () => {
            this._snackBar.open('Error al eliminar la categoría', '', {
              duration: 2000
            });
          }
        });
      }
    });
  }
}

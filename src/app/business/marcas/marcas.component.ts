import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from '../../core/models/marca';
import { MatTableDataSource } from '@angular/material/table';
import { MarcaService } from '../../core/services/marca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalMarcaComponent } from './modal-marca/modal-marca.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css'
})
export class MarcasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];
  dataInicio: Marca[] = [];
  dataListaMarcas = new MatTableDataSource(this.dataInicio);
 
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private _marcaService: MarcaService, private _snackBar: MatSnackBar,
    private _dialog: MatDialog) {
  }
  
  ngOnInit(): void {
    this.getMarcas();  
  }

  ngAfterViewInit(): void {
    this.dataListaMarcas.paginator = this.paginacionTabla;
  }
  
  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataListaMarcas.filter = filterValue.trim().toLowerCase();
  }

  getMarcas(){
    this._marcaService.getMarcas(0, 10000).subscribe({
      next: (data) => {
        this.dataListaMarcas.data = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar las marcas', '', {
          duration: 2000
        });
      }
    });
  }

  createMarca(){
    this._dialog.open(ModalMarcaComponent, {
      width: '500px',
      height: '400px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getMarcas();
      }
    });
  }

  updateMarca(marca: Marca){
    this._dialog.open(ModalMarcaComponent, {
      width: '500px',
      height: '400px',
      disableClose: true,
      data: marca
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getMarcas();
      }
    });
  }

  deleteMarca(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una Marca eliminada no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this._marcaService.deleteMarca(id).subscribe({
          next: (data) =>{
            if(data){
              this.getMarcas();
              this._snackBar.open('Marca eliminada con éxito', '', {
                duration: 2000
              });
            }
          },
          error: () => {
            this._snackBar.open('Error al eliminar la marca', '', {
              duration: 2000
            });
          }
        });
      }
    });
  }
}

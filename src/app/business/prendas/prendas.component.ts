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

@Component({
  selector: 'app-prendas',
  templateUrl: './prendas.component.html',
  styleUrl: './prendas.component.css'
})
export class PrendasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['img', 'nombre', 'marca', 'categoria', 'talla', 'color', 'precio','acciones'];
  dataInicio: Prenda[] = [];
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

  getCategoriaNombre(id: number){
    this._categoriaService.getCategoriaById(id).subscribe({
      next: (data) => {
        return data.nombre_categoria;
      },
      error: () => {
        return 'No encontrada';
      }
    });
  }
  
  getMarcaNombre(id: number){
    this._marcaService.getMarcaById(id).subscribe({
      next: (data) => {
        return data.nombre_marca;
      },
      error: () => {
        return 'No encontrada';
      }
    });
  }

  createPrenda(){
    this._dialog.open(ModalPrendaComponent, {
      width: '500px',
      height: '525px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getPrendas();
      }
    });
  }
  
  updatePrenda(prenda: Prenda){
    this._dialog.open(ModalPrendaComponent, {
      width: '500px',
      height: '525px',
      disableClose: true,
      data: prenda
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getPrendas();
      }
    });
  }

  deletePrenda(id_prenda: number){
    this._prendaService.deletePrenda(id_prenda).subscribe({
      next: () => {
        this.getPrendas();
      },
      error: () => {
        this._snackBar.open('Error al eliminar la prenda', '', {
          duration: 2000
        });
      }
    });
  }

}

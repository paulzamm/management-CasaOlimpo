import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { VentaResponse } from '../../core/models/venta-response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaService } from '../../core/services/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetalleVentaComponent } from './modal-detalle-venta/modal-detalle-venta.component';
import moment from 'moment';

export const DATA_FORMATS = {
  parse:{
    dateInput: 'DD/MM/YYYY'
  },
  display:{
    dateInpunt: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-historial-venta',
  templateUrl: './historial-ventas.component.html',
  styleUrl: './historial-ventas.component.css',
  providers: [ provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: DATA_FORMATS}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class HistorialVentasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fecha_venta', 'id_venta', 'metodo_pago_venta', 'total_venta', 'acciones'];
  historialForm!: FormGroup;
  busqueda: any [] = [
    {value: 'fecha', descripcion: 'Por fechas'},
    {value: 'numero', descripcion: 'Numero venta'}
  ];
  dataInicio: VentaResponse[] = [];
  ventasByID: VentaResponse[] = [];
  ventasFechas: VentaResponse[] = [];
  dataListaVenta = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private _formBuilder: FormBuilder, private _snackbar: MatSnackBar,
    private _ventaService: VentaService, private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.historialForm = this.initForm();

    this.historialForm.get('buscador')?.valueChanges.subscribe(value => {
      this.historialForm.patchValue({
        numero: '',
        fechaInicio: '',
        fechaFin: ''
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataListaVenta.paginator = this.paginacionTabla;
  }
  
  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataListaVenta.filter = filterValue.trim().toLowerCase();
  }
  
  initForm(): FormGroup{
    return this._formBuilder.group({
      buscador: ['numero'],
      fechaInicio: [''],
      fechaFin: [''],
      numero: ['']
    });
  }
  
  buscarVentas(){
    let _fechaInicio: string = '';
    let _fechaFin: string = '';

    if(this.historialForm.value.buscador === 'fecha'){
      _fechaInicio = moment(this.historialForm.value.fechaInicio).format('YYYY-MM-DD');
      _fechaFin = moment(this.historialForm.value.fechaFin).format('YYYY-MM-DD');

      if(_fechaInicio === 'Invalid date' || _fechaFin === 'Invalid date'){
        this._snackbar.open('Fecha no valida', '', {
          duration: 2000
        });
        return;
      }
      this.getVentaByFecha(_fechaInicio, _fechaFin);

    }else if(this.historialForm.value.buscador === 'numero'){
      this.getVentaById(this.historialForm.value.numero);
    }
  }
  
  getVentaById(id_venta: number){
    if(id_venta){
      this._ventaService.getVentaById(id_venta).subscribe({
        next: (data) => {
          this.ventasByID = [];
          this.ventasByID.push(data);
        },
        error: (error) => {
          this._snackbar.open(error.error.detail, '', {
            duration: 2000
          });
        },
        complete: () => {
          this.dataListaVenta.data = this.ventasByID;
        }
      });
    }else{
      this._snackbar.open('Ingrese un numero de venta', '', {
        duration: 2000
      });
    }
    
  }
  
  getVentaByFecha(fechaInicio: string, fechaFin: string) {
    this._ventaService.getVentas(0, 10000).subscribe({
      next: (data) => {
        const _fechaInicio = moment(fechaInicio);
        const _fechaFin = moment(fechaFin);
        this.ventasFechas = [];
        data.forEach(venta => {
          const fechaVenta = moment(venta.fecha_venta);
          if (fechaVenta.isBetween(_fechaInicio, _fechaFin, undefined, '[]')) {
            this.ventasFechas.push(venta);
          }
        });
      },
      error: () => {
        this._snackbar.open('Error al cargar las ventas por fecha', '', {
          duration: 2000
        });
      },
      complete: () => {
        this.dataListaVenta.data = this.ventasFechas;
      }
    });
  }
  

  verDetalleVenta(venta: VentaResponse){
    this.dialog.open(ModalDetalleVentaComponent, {
      width: '690px',
      height: '500px',
      disableClose: true,
      data: venta
    });
  }
}

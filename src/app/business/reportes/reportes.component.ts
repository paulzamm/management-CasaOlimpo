import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { VentaResponse } from '../../core/models/venta-response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaService } from '../../core/services/venta.service';
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
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css',
  providers: [ provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: DATA_FORMATS}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReportesComponent implements OnInit, AfterViewInit{
  filtroForm!: FormGroup;
  listaVentasReporte: VentaResponse[] = [];
  ventasFechas: VentaResponse[] = [];
  displayedColumns: string[] = ['fecha_venta', 'id_venta', 'metodo_pago_venta', 'nombre_prenda', 'talla_prenda', 'color_prenda', 'precio_prenda', 'cantidad_detalle_venta', 'total_detalle_venta'];
  dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  
  constructor(private _formBuilder: FormBuilder, private _snackbar: MatSnackBar,
    private _ventaService: VentaService){
  }


  ngOnInit(): void {
    this.filtroForm = this.initForm();
  }

  ngAfterViewInit(): void {
    this.dataVentaReporte.paginator = this.paginacionTabla;
  }

  initForm(): FormGroup{
    return this._formBuilder.group({
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
    });
  }

  buscarVentas(){

    const _fechaInicio = moment(this.filtroForm.value.fechaInicio).format('YYYY-MM-DD');
    const _fechaFin = moment(this.filtroForm.value.fechaFin).format('YYYY-MM-DD');

    if(_fechaInicio === 'Invalid date' || _fechaFin === 'Invalid date'){
      this._snackbar.open('Fecha no valida', '', {
        duration: 2000
      });
      return;
    }
    this.getVentaByFecha(_fechaInicio, _fechaFin);
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
        this.listaVentasReporte = this.ventasFechas;
        this.dataVentaReporte.data = this.ventasFechas;
      }
    });
  }
 
}

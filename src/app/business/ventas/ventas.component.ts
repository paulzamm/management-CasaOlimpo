import { Component, OnInit } from '@angular/core';
import { PrendaResponse } from '../../core/models/prenda-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PrendaService } from '../../core/services/prenda.service';
import { VentaService } from '../../core/services/venta.service';
import { Venta } from '../../core/models/venta';
import { DetalleVenta } from '../../core/models/detalle-venta';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteResponse } from '../../core/models/cliente-response';
import { ClienteService } from '../../core/services/cliente.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  displayedColumns: string[] = ['nombre_prenda', 'cantidad', 'precio', 'total', 'acciones'];
  ventaForm!: FormGroup;

  listaPrendas: PrendaResponse [] = [];
  listaClientes: ClienteResponse [] = [];
  listaPrendasFiltro: PrendaResponse [] = [];
  listaClientesFiltro: ClienteResponse [] = [];
  listaPrendasVenta: PrendaVenta [] = [];
  listaDetalleVenta: DetalleVenta [] = [];
  
  hiddeRegisterButton: boolean = false;
  hiddeCliente: boolean = true;
  prendaSelected!: PrendaResponse;
  clienteSelected!: ClienteResponse;
  tipoPago: string = 'Efectivo';
  totalVenta: number = 0;
  dataDetalleVenta = new MatTableDataSource(this.listaPrendasVenta);
  
  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,
    private _prendaService: PrendaService,private _ventaService: VentaService,
    private _clienteService: ClienteService) {
  }
  
  ngOnInit(): void {
    this.ventaForm = this.initForm();
    this.getPrendas();
    this.getClientes();

    //Filtrado del AutoComplete para seleccionar las prendas
    this.ventaForm.get('prenda')?.valueChanges.subscribe(value => {
      this.listaPrendasFiltro = this.getPrendasFiltro(value);
    });

    //Filtrado del AutoComplete para seleccionar los clientes
    this.ventaForm.get('cliente')?.valueChanges.subscribe(value => {
      this.listaClientesFiltro = this.getClientesFiltro(value);
    });
  }

  initForm(): FormGroup{
    return this._formBuilder.group({
      prenda: ['', [Validators.required]],
      cantidad: [1, [Validators.required]],
      cliente: ['', [Validators.required]],
      metodo_pago_venta: [this.tipoPago, [Validators.required]]
    });
  }
  
  getPrendasFiltro(value: any): PrendaResponse[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.nombre_prenda.toLowerCase();
    return this.listaPrendas.filter(prenda => prenda.nombre_prenda.toLowerCase().includes(filterValue));
  }

  getClientesFiltro(value: any): ClienteResponse[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.listaClientes.filter(cliente =>{
      const cedula = cliente.cedula_cliente.toLowerCase();
      const primerNombre = cliente.primer_nombre_cliente.toLowerCase();
      const segundoNombre = cliente.segundo_nombre_cliente.toLowerCase();
      const primerApellido = cliente.primer_apellido_cliente.toLowerCase();
      const segundoApellido = cliente.segundo_apellido_cliente.toLowerCase();

      return cedula.includes(filterValue) || 
        primerNombre.includes(filterValue) || 
        segundoNombre.includes(filterValue) ||
        primerApellido.includes(filterValue) || 
        segundoApellido.includes(filterValue);
    });
  }

  getPrendas(){
    this._prendaService.getPrendas(0, 10000).subscribe({
      next: (data) => {
        if(data){
          this.listaPrendas = data;
        }
      },
      error: () => {
        this._snackBar.open('Error al cargar las prendas', '', {
          duration: 2000
        });
      }
    });
  }
  
  getClientes(){
    this._clienteService.getClientes(0, 10000).subscribe({
      next: (data) => {
        if(data){
          this.listaClientes = data;
        }
      },
      error: () => {
        this._snackBar.open('Error al cargar los clientes', '', {
          duration: 2000
        });
      }
    });
  }

  showPrenda(prenda: PrendaResponse): string{
    return prenda ? prenda.nombre_prenda : '';
  }
  
  showCliente(cliente: ClienteResponse): string {
    return cliente ? `${cliente.primer_nombre_cliente} ${cliente.segundo_nombre_cliente} ${cliente.primer_apellido_cliente} ${cliente.segundo_apellido_cliente}` : '';
  }

  prendaVenta(event: any){
    this.prendaSelected = event.option.value;
  }

  clienteVenta(event: any){
    this.clienteSelected = event.option.value;
  }

  addPrenda(){
    const _cantidad: number = this.ventaForm.value.cantidad;
    const _precio: number = this.prendaSelected.precio_prenda;
    const _total: number = _cantidad * _precio;
    this.totalVenta += _total;

    this.listaPrendasVenta.push({
      id_prenda: this.prendaSelected.id_prenda,
      nombre_prenda: this.prendaSelected.nombre_prenda,
      cantidad: _cantidad,
      precio: _precio,
      total: _total
    });
    
    this.listaDetalleVenta.push({
      id_prenda: this.prendaSelected.id_prenda,
      cantidad_detalle_venta: _cantidad
    });

    this.dataDetalleVenta = new MatTableDataSource(this.listaPrendasVenta);

    this.ventaForm.reset({
      prenda: '',
      cantidad: 1,
      cliente: this.clienteSelected,
      metodo_pago_venta: this.tipoPago 
    });
  }

  deletePrendaVenta(prenda: PrendaVenta){
    this.totalVenta = this.totalVenta - prenda.total;
    this.listaPrendasVenta = this.listaPrendasVenta.filter(x => x.id_prenda !== prenda.id_prenda);
    this.listaDetalleVenta = this.listaDetalleVenta.filter(x => x.id_prenda !== prenda.id_prenda);

    this.dataDetalleVenta = new MatTableDataSource(this.listaPrendasVenta);
  }

  registrarVenta(){
    if(this.listaPrendasVenta.length > 0){
      this.hiddeRegisterButton = true;
      const _venta: Venta = {
        id_cliente: this.ventaForm.value.cliente.id_cliente,
        metodo_pago_venta: this.ventaForm.value.metodo_pago_venta,
        prendas: this.listaDetalleVenta
      }

      this.listaPrendasVenta = [];
      this.listaDetalleVenta = [];
      this.dataDetalleVenta = new MatTableDataSource(this.listaPrendasVenta);
      this.hiddeRegisterButton = false;
      this._ventaService.createVenta(_venta).subscribe({
        next: (res) => {
          if(res){
            this.totalVenta = 0.00;
            this.listaPrendasVenta = [];
            this.listaDetalleVenta = [];
            this.dataDetalleVenta = new MatTableDataSource(this.listaPrendasVenta);

            Swal.fire({
              icon: 'success',
              title: 'Venta registrada!',
              text: `Número de venta: ${res.id_venta}`
            });
          }else{
            this._snackBar.open('No se pudo registrar la venta', '', {
              duration: 2000
            });
          }
        },
        complete: () => {
          this.hiddeRegisterButton = false;
          this.ventaForm.reset({
            prenda: '',
            cantidad: 1,
            cliente: '',
            metodo_pago_venta: this.tipoPago 
          });
        },
        error: () => {
          this._snackBar.open('Error al registrar la venta', '', {
            duration: 2000
          });
        }
      });
    }
  }
}

//Interface para mostrar las prendas en la tabla de ventas
export interface PrendaVenta {
  id_prenda: number;
  nombre_prenda: string;
  cantidad: number;
  precio: number;
  total: number;
}

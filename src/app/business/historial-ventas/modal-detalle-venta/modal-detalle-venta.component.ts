import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentaResponse } from '../../../core/models/venta-response';
import { DetalleVentaResponse } from '../../../core/models/detalle-venta-response';
import { ClienteResponse } from '../../../core/models/cliente-response';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-modal-detalle-venta',
  templateUrl: './modal-detalle-venta.component.html',
  styleUrl: './modal-detalle-venta.component.css'
})
export class ModalDetalleVentaComponent implements OnInit{
  id_venta!: number;
  cliente: ClienteResponse = {} as ClienteResponse;
  total_venta!: number;
  fecha_venta: string = '';
  metodo_pago_venta: string = '';
  detalle_venta: DetalleVentaResponse[] = [];

  displayedColumns: string[] = ['prenda', 'cantidad', 'precio', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public _venta: VentaResponse,
    private _clienteService: ClienteService){
  }

  ngOnInit(): void {
    this.id_venta = this._venta.id_venta;
    this.total_venta = this._venta.total_venta;
    this.fecha_venta = this._venta.fecha_venta;
    this.metodo_pago_venta = this._venta.metodo_pago_venta;
    this.detalle_venta = this._venta.prendas;
    this._clienteService.getClienteById(this._venta.id_cliente).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  get NombreCliente(): string {
    return `${this.cliente.primer_nombre_cliente} ${this.cliente.segundo_nombre_cliente} ${this.cliente.primer_apellido_cliente} ${this.cliente.segundo_apellido_cliente}`.trim();
  }
}

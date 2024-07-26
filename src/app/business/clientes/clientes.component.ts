import { Component } from '@angular/core';
import { Cliente } from '../../core/models/cliente';
import { ClienteService } from '../../core/services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent {
  clients: Cliente[] = [];
  displayedColumns: string[] = ['id_cliente', 'id_user', 'cedula_cliente', 'nombres', 'apellidos', 'direccion', 'ciudad', 'correo', 'acciones'];
  clientData = new MatTableDataSource<Cliente>(this.clients);
  loading: boolean = false;
  
  
  constructor(private _clienteService: ClienteService,
    private _snackBar: MatSnackBar, private _dialog:MatDialog
  ){}

  filterClientData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientData.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.loading = true;
    this._clienteService.getClientes().subscribe({
      next: data => {
        this.clients = data;
        this.clientData.data = this.clients;
        this.loading = false;
      },
      error: () => {
        this._snackBar.open('Error al cargar los clientes', 'Cerrar',{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.loading = false;
      }
    });
  }

  createClient(){
    this._dialog.open(ModalClienteComponent, {
      width: '550px',
      height: '500px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getClients()
      }
    });
  }

  updateClient(cliente: Cliente){
    this._dialog.open(ModalClienteComponent, {
      disableClose: true,
      data: cliente
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getClients()
      }
    });
  }

  deleteClient(cliente: Cliente){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Un cliente eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if(result.isConfirmed){
        this.loading = true;
        this._clienteService.deleteCliente(cliente.id_cliente).subscribe({
          next: () => {
            this.getClients();
            this._snackBar.open('Cliente eliminado', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.loading = false;
          },
          error: () => {
            this._snackBar.open('Error al eliminar el cliente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.loading = false;
          }
        });
      }
    });
  }
}
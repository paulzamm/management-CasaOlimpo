import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../core/models/cliente';
import { ClienteService } from '../../core/services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['cedula', 'nombres', 'apellidos', 'email', 'ciudad', 'acciones'];
  dataInicio: Cliente[] = [];
  dataListaClientes = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private _clienteService: ClienteService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getClientes();      
  }

  ngAfterViewInit(): void {
    this.dataListaClientes.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataListaClientes.filter = filterValue.trim().toLowerCase();
  }

  getClientes(){
    this._clienteService.getClientes(0, 10000).subscribe({
      next: (data) => {
        this.dataListaClientes.data = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar los clientes', '', {
          duration: 2000
        });
      }
    });
  }

  createCliente(){
    this._dialog.open(ModalClienteComponent, {
      width: '500px',
      height: '525px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getClientes();
      }
    });
  }

  updateCliente(cliente: Cliente){
    this._dialog.open(ModalClienteComponent, {
      width: '500px',
      height: '525px',
      disableClose: true,
      data: cliente
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getClientes();
      }
    });
  }

  deleteCliente(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Un Cliente eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        this._clienteService.deleteCliente(id).subscribe({
          next: (data) => {
            if(data){
              this.getClientes();
              this._snackBar.open('Cliente eliminado con éxito', '', {
                duration: 2000
              });
            }
          },
          error: () => {
            this._snackBar.open('Error al eliminar el Cliente', '', {
              duration: 2000
            });
          }
        });
      }
    });
  }
}
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../core/models/usuario';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioService } from '../../core/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';
import { RolService } from '../../core/services/rol.service';
import { Rol } from '../../core/models/rol';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['username', 'email', 'rol', 'acciones'];
  dataInicio: Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private _usuarioService: UsuarioService, private _authService: AuthService,
    private _snackBar: MatSnackBar, private _rolService: RolService,
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUsuarios();   
  }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(evento: Event){
    const filterValue = (evento.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLowerCase();
  }

  getUsuarios(){
    this._usuarioService.getUsuarios(0, 10000).subscribe({
      next: (data) => {
        this.dataListaUsuarios.data = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar los usuarios', '', {
          duration: 2000
        });
      }
    });
  }
  
  getNombreRol(id: number){
    this._rolService.getRolById(id).subscribe({
      next: (data) =>{
        
      }
    });
  }

  createUsuario(){
    this._dialog.open(ModalUsuarioComponent, {
      width: '500px',
      height: '525px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result === 'true'){
        this.getUsuarios();
      }
    });
  }

  deleteUsuario(id: number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Un Usuario eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this._authService.getCurrentUser().subscribe({
          next: (data) => {
            if(data.id_usuario == id){
              this._snackBar.open('No puedes eliminar tu propio usuario', '', {
                duration: 2000
              });
            }else{
              this._usuarioService.deleteUsuario(id).subscribe({
                next: (data) =>{
                  if(data){
                    this.getUsuarios();
                    this._snackBar.open('Usuario eliminado con éxito', '', {
                      duration: 2000
                    });
                  }
                },
                error: () => {
                  this._snackBar.open('Error al eliminar el Usuario', '', {
                    duration: 2000
                  });
                }
              });
            }
          }
        });
      }
    });
  }
}

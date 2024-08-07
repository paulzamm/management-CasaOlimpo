import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../../core/services/cliente.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../../core/models/cliente';
import { Usuario } from '../../../core/models/usuario';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.css'
})
export class ModalClienteComponent implements OnInit {
  clienteForm!: FormGroup;
  accionTitle: string = 'Agregar';
  accionButton: string = 'Guardar';
  listaUsuarios: Usuario[] = [];

  constructor(private _formBuilder: FormBuilder, private _clienteService: ClienteService,
    private _snackBar: MatSnackBar, private modalActual: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) private obCliente: Cliente, private _usuarioService: UsuarioService
  ){
    if(this.obCliente != null){
      this.accionTitle = 'Editar';
      this.accionButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    this.clienteForm = this.initForm();
    this.getUsuarios();
    if(this.obCliente != null){
      this.setDatos(this.obCliente);
    }
  }
  
  getUsuarios(){
    this._usuarioService.getUsuarios(0, 10000).subscribe({
      next: (data) => {
        this.listaUsuarios = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar los usuarios', '', {
          duration: 2000
        });
      }
    });
  }

  initForm(): FormGroup{
    return this._formBuilder.group({
      id_usuario: ['', [Validators.required]],
      cedula_cliente: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      primer_nombre_cliente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      segundo_nombre_cliente: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      primer_apellido_cliente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      segundo_apellido_cliente: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      direccion_cliente: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      ciudad_cliente: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      correo_cliente: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    });
  }
  
  setDatos(cliente: Cliente){
    this.clienteForm.patchValue({
      id_cliente: cliente.id_cliente,
      id_usuario: cliente.id_usuario,
      cedula_cliente: cliente.cedula_cliente,
      primer_nombre_cliente: cliente.primer_nombre_cliente,
      segundo_nombre_cliente: cliente.segundo_nombre_cliente,
      primer_apellido_cliente: cliente.primer_apellido_cliente,
      segundo_apellido_cliente: cliente.segundo_apellido_cliente,
      direccion_cliente: cliente.direccion_cliente,
      ciudad_cliente: cliente.ciudad_cliente,
      correo_cliente: cliente.correo_cliente
    });
  }

  guardarCliente(){
    const _cliente: Cliente = {
      id_cliente: this.obCliente == null ? 0 : this.obCliente.id_cliente,
      id_usuario: this.clienteForm.value.id_usuario,
      cedula_cliente: this.clienteForm.value.cedula_cliente,
      primer_nombre_cliente: this.clienteForm.value.primer_nombre_cliente,
      segundo_nombre_cliente: this.clienteForm.value.segundo_nombre_cliente,
      primer_apellido_cliente: this.clienteForm.value.primer_apellido_cliente,
      segundo_apellido_cliente: this.clienteForm.value.segundo_apellido_cliente,
      direccion_cliente: this.clienteForm.value.direccion_cliente,
      ciudad_cliente: this.clienteForm.value.ciudad_cliente,
      correo_cliente: this.clienteForm.value.correo_cliente
    }

    if(this.obCliente == null){
      this._clienteService.createCliente(_cliente).subscribe({
        next: (res) =>{
          if(res){
            this._snackBar.open('Cliente creado con éxito', '', {
              duration: 2000,
            });
          }else{
            this._snackBar.open('No se pudo crear el Cliente', '', {
              duration: 2000,
            });
          }
          
          this.modalActual.close('true');
        },
        error: () => {
          this._snackBar.open('Error al crear el Cliente', '', {
            duration: 2000,
          });
        }
      });
    }else{
      this._clienteService.updateCliente(_cliente).subscribe({
        next: (res) =>{
          if(res){
            this._snackBar.open('Cliente actualizado con éxito', '', {
              duration: 2000,
            });
          }else{
            this._snackBar.open('No se pudo actualizar el Cliente', '', {
              duration: 2000,
            });
          }
          
          this.modalActual.close('true');
        },
        error: () => {
          this._snackBar.open('Error al actualizar el cliente', '', {
            duration: 2000,
          });
        }
    });
    }
  }
}

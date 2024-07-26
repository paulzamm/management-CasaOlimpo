import { Component, Inject, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../core/models/usuario';
import { Rol } from '../../../core/models/rol';
import { RolService } from '../../../core/services/rol.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent implements OnInit{
  usuarioForm!: FormGroup;
  accionTitle: string = 'Agregar';
  accionButton: string = 'Guardar';
  listaRoles: Rol[] = [];

  constructor(private _formBuilder: FormBuilder, 
    private _usuarioService: UsuarioService, private _rolService: RolService,
    private _snackBar: MatSnackBar, private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) private obUsuario: Usuario
  ){
    this._rolService.getRoles(0, 10).subscribe({
      next: (data) => {
        this.listaRoles = data;
      },
      error: () => {
        this._snackBar.open('Error al cargar los roles', '', {
          duration: 2000
        });
      }
    });
  }

  ngOnInit(): void {
    this.usuarioForm = this.initForm();
  }

  initForm(): FormGroup{
    return this._formBuilder.group({
      id_rol: ['', [Validators.required]],
      username_usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      clave_usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email_usuario: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }
   
  guardarUsuario(){
    const _usuario: Usuario = {
      id_usuario: this.obUsuario == null ? 0 : this.obUsuario.id_usuario,
      id_rol: this.usuarioForm.value.id_rol,
      username_usuario: this.usuarioForm.value.username_usuario,
      clave_usuario: this.usuarioForm.value.clave_usuario,
      email_usuario: this.usuarioForm.value.email_usuario
    }

    if(this.obUsuario == null){
      this._usuarioService.createUsuario(_usuario).subscribe({
        next: () => {
          this._snackBar.open('Usuario creado con éxito', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.modalActual.close('true');
        },
        error: () => {
          this._snackBar.open('Error al crear el Usuario', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }
}

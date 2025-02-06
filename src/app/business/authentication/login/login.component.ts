import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private _formBuilder: FormBuilder, private auth: AuthService, 
    private router: Router, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm():FormGroup{
    return this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });
  }

  login(): void{
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        if(res){
          Swal.fire({
            icon: 'info',
            title: 'Código de verificación Requerido',
            text: 'Por favor, ingrese el código de verificación que se ha enviado a su correo electrónico',
            input: 'text',
            inputPlaceholder: 'Ingrese aquí el código de verificación',
            showCancelButton: true,
            confirmButtonText: 'Verificar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if(result.isConfirmed){
              const code = result.value;

              this.auth.verify2fa(code, this.username, this.password).subscribe({
                next: (res) => {
                  if(res){
                    Swal.fire({
                      icon: 'success',
                      title: 'Bienvenido',
                      text: 'Inicio de sesión exitoso',
                      showConfirmButton: false,
                      timer: 1250
                    });
                    this.router.navigate(['/pages/dashboard'])
                  }else{
                    this._snackBar.open('No se pudo verificar el código', 'Cerrar', {
                      duration: 2000,
                      horizontalPosition: 'center',
                      verticalPosition: 'bottom',
                    });
                  }
                },
                error: (error) => {
                  this._snackBar.open(error.error.detail, 'Cerrar', {
                    duration: 2000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                  }); 
                }
              });
            }else{
              this._snackBar.open('Operación Cancelada', 'Cerrar', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              });
            }
          });
        }else{
          this._snackBar.open('No se pudo iniciar sesión', 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      },
      error: (error) => {
        this._snackBar.open(error.error.detail, 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }); 
      }
    });
  }
}

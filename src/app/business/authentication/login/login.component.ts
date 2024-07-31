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
          this.auth.getCurrentUser().subscribe({
            next: (data) => {
              if(data.id_rol === 1){
                Swal.fire({
                  icon: 'success',
                  title: 'Bienvenido',
                  text: 'Inicio de sesión exitoso',
                  showConfirmButton: false,
                  timer: 1250
                });
                this.router.navigate(['/pages/dashboard'])
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Acceso denegado',
                  text: 'No tienes permisos para acceder a esta sección',
                  confirmButtonText: 'Aceptar'
                });
                this.auth.logout();
              }
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

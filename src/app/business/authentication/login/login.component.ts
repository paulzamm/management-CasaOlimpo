import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  showLoadign = false;
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
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });
  }

  login(): void{
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.showLoadign = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/pages/dashboard']),
      error: () => {
        this._snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }); 
      }
    });
    this.showLoadign = false;
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../core/models/usuario';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  user: Usuario = {} as Usuario;
  
  constructor(private auth: AuthService, private router: Router){
  }
  
  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user =>{
      if(user){
        this.user = user;
      }else{
        console.log('User no found');
      }
    });
  }

  logout(): void{
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

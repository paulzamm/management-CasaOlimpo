import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  
  constructor(private auth: AuthService, private router: Router){}

  logout(): void{
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {


  menuItems = signal<menuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/pages/dashboard' },
    { icon: 'account_circle', label: 'Usuarios', route: '/pages/usuarios' },
    { icon: 'group', label: 'Clientes', route: '/pages/clientes' },
    { icon: 'store', label: 'Marcas', route: '/pages/marcas' },
    { icon: 'list_alt', label: 'Prendas', route: '/pages/prendas' },
    { icon: 'sell', label: 'Categorías', route: '/pages/categorias' },
    { icon: 'currency_exchange', label: 'Venta', route: '/pages/categorias' },
    { icon: 'edit_note', label: 'Historial Ventas', route: '/pages/categorias' },
    { icon: 'receipt', label: 'Reportes', route: '/pages/categorias' },
  ]);
}

export type menuItem = {
  icon: string;
  label: string;
  route: string;
}
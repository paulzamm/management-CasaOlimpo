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
    { icon: 'sell', label: 'Categorías', route: '/pages/categorias' },
    { icon: 'list_alt', label: 'Prendas', route: '/pages/prendas' },
    { icon: 'currency_exchange', label: 'Venta', route: '/pages/ventas' },
    { icon: 'edit_note', label: 'Historial Ventas', route: '/pages/historial-ventas' },
    { icon: 'receipt', label: 'Reportes', route: '/pages/reportes' },
  ]);
}

export type menuItem = {
  icon: string;
  label: string;
  route: string;
}
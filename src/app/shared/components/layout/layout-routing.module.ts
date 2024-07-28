import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../../../business/dashboard/dashboard.component';
import { PrendasComponent } from '../../../business/prendas/prendas.component';
import { CategoriasComponent } from '../../../business/categorias/categorias.component';
import { ClientesComponent } from '../../../business/clientes/clientes.component';
import { authGuard } from '../../../core/guards/auth.guard';
import { MarcasComponent } from '../../../business/marcas/marcas.component';
import { UsuariosComponent } from '../../../business/usuarios/usuarios.component';
import { VentasComponent } from '../../../business/ventas/ventas.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
      { path: 'prendas', component: PrendasComponent, canActivate: [authGuard]},
      { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard]},
      { path: 'clientes', component: ClientesComponent, canActivate: [authGuard]},
      { path: 'marcas', component:  MarcasComponent, canActivate: [authGuard]},
      { path: 'usuarios', component:  UsuariosComponent, canActivate: [authGuard]},
      { path: 'ventas', component: VentasComponent, canActivate: [authGuard]},
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

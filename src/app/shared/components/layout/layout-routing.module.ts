import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../../../business/dashboard/dashboard.component';
import { PrendasComponent } from '../../../business/prendas/prendas.component';
import { CategoriasComponent } from '../../../business/categorias/categorias.component';
import { ClientesComponent } from '../../../business/clientes/clientes.component';
import { authGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
      { path: 'prendas', component: PrendasComponent, canActivate: [authGuard]},
      { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard]},
      { path: 'clientes', component: ClientesComponent, canActivate: [authGuard]},
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

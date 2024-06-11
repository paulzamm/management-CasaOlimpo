import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PrendasComponent } from './Components/prendas/prendas.component';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { ClientesComponent } from './Components/clientes/clientes.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'prendas', component: PrendasComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: '', pathMatch:'full', redirectTo:'dashboard'},
  {path: '**', pathMatch:'full', redirectTo:'dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

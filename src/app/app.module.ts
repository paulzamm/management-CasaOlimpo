import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PrendasComponent } from './Components/prendas/prendas.component';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { ClientesComponent } from './Components/clientes/clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PrendasComponent,
    CategoriasComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

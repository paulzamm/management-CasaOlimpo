import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { DashboardComponent } from './business/dashboard/dashboard.component';
import { PrendasComponent } from './business/prendas/prendas.component';
import { CategoriasComponent } from './business/categorias/categorias.component';
import { ClientesComponent } from './business/clientes/clientes.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './business/authentication/login/login.component';
import { LayoutRoutingModule } from './shared/components/layout/layout-routing.module';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { ModalClienteComponent } from './business/clientes/modal-cliente/modal-cliente.component';
import { MarcasComponent } from './business/marcas/marcas.component';
import { ModalMarcaComponent } from './business/marcas/modal-marca/modal-marca.component';
import { ModalCategoriaComponent } from './business/categorias/modal-categoria/modal-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PrendasComponent,
    CategoriasComponent,
    ClientesComponent,
    FooterComponent,
    LayoutComponent,
    LoginComponent,
    SidenavComponent,
    ModalClienteComponent,
    MarcasComponent,
    ModalMarcaComponent,
    ModalCategoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LayoutRoutingModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

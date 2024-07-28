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
import { UsuariosComponent } from './business/usuarios/usuarios.component';
import { ModalUsuarioComponent } from './business/usuarios/modal-usuario/modal-usuario.component';
import { VentasComponent } from './business/ventas/ventas.component';
import { ModalPrendaComponent } from './business/prendas/modal-prenda/modal-prenda.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

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
    ModalCategoriaComponent,
    UsuariosComponent,
    ModalUsuarioComponent,
    VentasComponent,
    ModalPrendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LayoutRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBAlTIZAGyv6MPFar-iAE4Q8D2r80Lc9mA",
      authDomain: "casaolimpo-storage.firebaseapp.com",
      projectId: "casaolimpo-storage",
      storageBucket: "casaolimpo-storage.appspot.com",
      messagingSenderId: "559391945141",
      appId: "1:559391945141:web:4cd281285a5b118c4829fc",
  })),
  
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './business/authentication/login/login.component';
import { authenticatedGuard } from './core/guards/authenticated.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [authenticatedGuard] },
  { path: 'pages', loadChildren: () => import('./shared/components/layout/layout.module').then(m => m.LayoutModule) },
  { path: '', redirectTo: 'login' , pathMatch: 'full'},
  { path: '**', redirectTo: 'login', pathMatch: 'full'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

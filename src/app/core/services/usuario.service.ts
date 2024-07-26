import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;

  constructor(private http:HttpClient, private auth: AuthService) { 
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'api/admin/usuarios/';
    this.myUrl = `${this.myappUrl}${this.myapiUrl}`;
  }

  getUsuarios(skip: number, limit: number): Observable<Usuario[]>{
    const headers = this.auth.getHeaders();
    return this.http.get<Usuario[]>(`${this.myUrl}?skip=${skip}&limit=${limit}`, { headers });
  }

  getUsuarioById(id_usuario: number): Observable<Usuario>{
    const headers = this.auth.getHeaders();
    return this.http.get<Usuario>(`${this.myUrl}${id_usuario}`, { headers });
  }

  createUsuario(usuario: Usuario): Observable<Usuario>{
    const headers = this.auth.getHeaders();
    return this.http.post<Usuario>(this.myUrl, usuario, { headers });
  }

  updateUsuario(usuario: Usuario): Observable<Usuario>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${usuario.id_usuario}`;
    return this.http.put<Usuario>(url, usuario, { headers });
  }

  deleteUsuario(id_usuario: number): Observable<Usuario>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${id_usuario}`;
    return this.http.delete<Usuario>(url, { headers });
  }
}

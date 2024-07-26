import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;

  constructor(private http:HttpClient, private auth: AuthService) { 
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'api/admin/categorias/';
    this.myUrl = `${this.myappUrl}${this.myapiUrl}`;
  }
  
  getCategorias(skip: number, limit: number): Observable<Categoria[]>{
    const headers = this.auth.getHeaders();
    return this.http.get<Categoria[]>(`${this.myUrl}?skip=${skip}&limit=${limit}`, { headers });
  }

  getCategoriaById(id_categoria: number): Observable<Categoria>{
    const headers = this.auth.getHeaders();
    return this.http.get<Categoria>(`${this.myUrl}${id_categoria}`, { headers });
  }

  createCategoria(marca: Categoria): Observable<Categoria>{
    const headers = this.auth.getHeaders();
    return this.http.post<Categoria>(this.myUrl, marca, { headers });
  }

  updateCategoria(marca: Categoria): Observable<Categoria>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${marca.id_categoria}`;
    return this.http.put<Categoria>(url, marca, { headers });
  }

  deleteCategoria(id_categoria: number): Observable<Categoria>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${id_categoria}`;
    return this.http.delete<Categoria>(url, { headers });
  }
}

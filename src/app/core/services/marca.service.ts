import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;

  constructor(private http:HttpClient, private auth: AuthService) { 
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'api/admin/marcas/';
    this.myUrl = `${this.myappUrl}${this.myapiUrl}`;
  }
  
  getMarcas(skip: number, limit: number): Observable<Marca[]>{
    const headers = this.auth.getHeaders();
    return this.http.get<Marca[]>(`${this.myUrl}?skip=${skip}&limit=${limit}`, { headers });
  }

  getMarcaById(marca_id: number): Observable<Marca>{
    const headers = this.auth.getHeaders();
    return this.http.get<Marca>(`${this.myUrl}${marca_id}`, { headers });
  }

  createMarca(marca: Marca): Observable<Marca>{
    const headers = this.auth.getHeaders();
    return this.http.post<Marca>(this.myUrl, marca, { headers });
  }

  updateMarca(marca: Marca): Observable<Marca>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${marca.id_marca}`;
    return this.http.put<Marca>(url, marca, { headers });
  }

  deleteMarca(marca_id: number): Observable<Marca>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${marca_id}`;
    return this.http.delete<Marca>(url, { headers });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Prenda } from '../models/prenda';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {

  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'api/admin/prendas/';
    this.myUrl = `${this.myappUrl}${this.myapiUrl}`;
   }

  getPrendas(skip: number, limit: number): Observable<Prenda[]>{
    const headers = this.auth.getHeaders();
    return this.http.get<Prenda[]>(`${this.myUrl}?skip=${skip}&limit=${limit}`, { headers });
  }

  getPrendaById(id_prenda: number): Observable<Prenda>{
    const headers = this.auth.getHeaders();
    return this.http.get<Prenda>(`${this.myUrl}${id_prenda}`, { headers });
  }

  createPrenda(prenda: Prenda): Observable<Prenda>{
    const headers = this.auth.getHeaders();
    return this.http.post<Prenda>(this.myUrl, prenda, { headers });
  }

  updatePrenda(prenda: Prenda): Observable<Prenda>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${prenda.id_prenda}`;
    return this.http.put<Prenda>(url, prenda, { headers });
  }

  deletePrenda(id_prenda: number): Observable<Prenda>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${id_prenda}`;
    return this.http.delete<Prenda>(url, { headers });
  }
}

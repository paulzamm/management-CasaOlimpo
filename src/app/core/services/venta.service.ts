import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { VentaResponse } from '../models/venta-response';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'api/admin/ventas/';
    this.myUrl = `${this.myappUrl}${this.myapiUrl}`;
   }

  getVentas(skip: number, limit: number): Observable<VentaResponse[]>{
    const headers = this.auth.getHeaders();
    return this.http.get<VentaResponse[]>(`${this.myUrl}?skip=${skip}&limit=${limit}`, { headers });
  }

  getVentaById(id_venta: number): Observable<VentaResponse>{
    const headers = this.auth.getHeaders();
    return this.http.get<VentaResponse>(`${this.myUrl}${id_venta}`, { headers });
  }

  createVenta(venta: Venta): Observable<any>{
    const headers = this.auth.getHeaders();
    return this.http.post<any>(this.myUrl, venta, { headers });
  }
}

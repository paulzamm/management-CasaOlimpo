import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../models/cliente-response';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'api/admin/clientes/';
    this.myUrl = `${this.myappUrl}${this.myapiUrl}`;
   }

  getClientes(skip: number, limit: number): Observable<ClienteResponse[]>{
    const headers = this.auth.getHeaders();
    return this.http.get<ClienteResponse[]>(`${this.myUrl}?skip=${skip}&limit=${limit}`, { headers });
  }

  getClienteById(id_cliente: number): Observable<ClienteResponse>{
    const headers = this.auth.getHeaders();
    return this.http.get<ClienteResponse>(`${this.myUrl}${id_cliente}`, { headers });
  }

  createCliente(cliente: Cliente): Observable<Cliente>{
    const headers = this.auth.getHeaders();
    return this.http.post<Cliente>(this.myUrl, cliente, { headers });
  }

  updateCliente(cliente: Cliente): Observable<Cliente>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${cliente.id_cliente}`;
    return this.http.put<Cliente>(url, cliente, { headers });
  }

  deleteCliente(id_cliente: number): Observable<Cliente>{
    const headers = this.auth.getHeaders();
    const url = `${this.myUrl}${id_cliente}`;
    return this.http.delete<Cliente>(url, { headers });
  }
}

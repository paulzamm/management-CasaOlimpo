import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;

  constructor(private http:HttpClient, private auth: AuthService) { 
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'api/admin/roles/';
    this.myUrl = `${this.myappUrl}${this.myapiUrl}`;
  }

  getRoles(skip: number, limit: number): Observable<Rol[]>{
    const headers = this.auth.getHeaders();
    return this.http.get<Rol[]>(`${this.myUrl}?skip=${skip}&limit=${limit}`, { headers });
  }

  getRolById(id_rol: number): Observable<Rol>{
    const headers = this.auth.getHeaders();
    return this.http.get<Rol>(`${this.myUrl}${id_rol}`, { headers });
  }
}

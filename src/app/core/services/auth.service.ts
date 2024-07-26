import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) { 
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'token/';
    this.myUrl = `${this.myappUrl}${this.myapiUrl}`;
  }
  
  /**
   * Iniciar Sesión
   * @param username 
   * @param password 
   * @returns 
   */
  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`

    return this.http.post(this.myUrl, body, { headers } ).pipe(
      tap((response: any) => {
        if(response.access_token){
          this.setToken(response.access_token);
        }
      })
    );
  }
  
  /**
   * Almacenar el token en el local storage
   * @param token 
   */
  private setToken(token: string){
    localStorage.setItem(this.tokenKey, token);
  }
    
  /**
   * Obtener el token del local storage
   * @returns token
   */
  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
  
  /**
   * Validar si el usuario esta autenticado
   * @returns boolean
   */
  isAuthenticated(): boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }
    const paylod = JSON.parse(atob(token.split('.')[1]));
    const exp = paylod.exp * 1000;
    return Date.now() < exp;
  }
  
  /**
   * Cerrar sesión
   */
  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  /**
   * Headers para endpoints
   * @returns HttpHeaders
   */
  getHeaders(): HttpHeaders{
    const token = this.getToken();
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  
  /**
   * Obtener el usuario actual autenticado
   * @returns Current User
   */
  getCurrentUser(): Observable<Usuario> {
    const headers = this.getHeaders();
    const url = `${this.myappUrl}users/me`;

    return this.http.get<Usuario>(url, { headers });
  }
}

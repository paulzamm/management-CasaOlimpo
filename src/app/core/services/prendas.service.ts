import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrendasService {
  
  private prendas: Prenda[] = [
    {
      id_prenda: 1,
      id_categoria: 1,
      nombre_prenda: 'Camisa',
      descripcion_prenda: 'Camisa de manga corta',
      talla_prenda: 'M',
      color_prenda: 'Azul',
      precio_prenda: 20,
      img_prenda: 'assets/img/camisa.jpg'
    }
  ]
  
  getPrendas(){
    return this.prendas;
  }
  
}

export interface Prenda{
  id_prenda: number;
  id_categoria: number;
  nombre_prenda: string;
  descripcion_prenda: string;
  talla_prenda: string;
  color_prenda: string;
  precio_prenda: number;
  img_prenda: string;
}
import { Categoria } from "./categoria";
import { Marca } from "./marca";

export interface PrendaResponse {
    id_prenda: number;
    id_categoria: number;
    id_marca: number;
    nombre_prenda: string;
    descripcion_prenda: string;
    talla_prenda: string;
    color_prenda: string;
    precio_prenda: number;
    img_prenda: string;
    categoria: Categoria;
    marca: Marca;
}
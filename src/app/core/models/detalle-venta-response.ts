import { Prenda } from "./prenda";

export interface DetalleVentaResponse {
    id_detalle_venta: number;
    id_venta: number;
    id_prenda: number;
    cantidad_detalle_venta: number;
    total_detalle_venta: number;
    prenda: Prenda;
}
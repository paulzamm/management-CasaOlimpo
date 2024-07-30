import { DetalleVentaResponse } from "./detalle-venta-response";

export interface VentaResponse {
    id_venta: number;
    id_cliente: number;
    fecha_venta: string;
    total_venta: number;
    metodo_pago_venta: string;
    prendas: DetalleVentaResponse[];
}
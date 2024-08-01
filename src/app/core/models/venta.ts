import { DetalleVenta } from "./detalle-venta";

export interface Venta {
    id_cliente: number;
    metodo_pago_venta: string;
    prendas: DetalleVenta[];
}

import { UsuarioResponse } from "./usuario-response";

export interface ClienteResponse {
    id_cliente: number;
    id_usuario: number;
    cedula_cliente: string;
    primer_nombre_cliente: string;
    segundo_nombre_cliente: string;
    primer_apellido_cliente: string;
    segundo_apellido_cliente: string;
    direccion_cliente: string;
    ciudad_cliente: string;
    correo_cliente: string; 
    usuario: UsuarioResponse;  
}
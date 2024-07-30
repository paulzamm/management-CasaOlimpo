import { Rol } from "./rol";

export interface UsuarioResponse {
    id_usuario: number;
    id_rol: number;
    username_usuario: string;
    clave_usuario: string;
    email_usuario: string;
    rol: Rol;
}
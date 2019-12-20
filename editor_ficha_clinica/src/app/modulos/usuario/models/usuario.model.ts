export class Usuario {
    nombre: string;
    email: string;
    password: string;
    token2FA?: string;
    Activo2FA?: boolean;
    activo?: boolean;
    roles?: string[];
    _id?: string;    
}

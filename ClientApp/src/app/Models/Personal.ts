export interface Personal{
    idPersonal: number;
    idTipoDoc: number;
    numeroDoc: string;
    apPaterno: string;
    apMaterno: string;
    nombre1: string;
    nombre2: string;
    nombreCompleto?: string;
    fechaNac: string;
    fechaIngreso: string;
}
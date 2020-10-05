export class Institucion {
    nit: string;
    dane: string;
    nombre: string;
    codigoMunicipio: string;
    constructor(nit:string, dane:string, nombre:string, codigoMunicipio:string)
    {
        this.nit = nit;
        this.dane = dane;
        this.nombre = nombre;
        this.codigoMunicipio = codigoMunicipio;
    }
}
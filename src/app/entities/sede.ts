import { Directivo } from './directivo';

export class Sede{
    /**
     *
     */
    constructor(
        public nit:string,
        public nombre: string,
        public direccion: string,
        public telefono: string
    ) {
        this.telefono = this.telefono?.toString();
        this.nit = this.nit?.toString();
    }

}
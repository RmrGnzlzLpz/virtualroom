import { DirectiveNormalizer } from '@angular/compiler';
import { Directivo } from './directivo';
import { Sede } from './sede';

export class Institucion{
    
    public sedes: Sede[];
    /**
     *
     */
    constructor(public nit: string,
        public dane: string,
        public nombre:string,
        public codigoMunicipio:string,                
        public paginaWeb:string ) {       

    }


}
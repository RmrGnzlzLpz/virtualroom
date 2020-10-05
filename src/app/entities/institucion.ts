import { DirectiveNormalizer } from '@angular/compiler';
import { Directivo } from './directivo';
import { Sede } from './sede';

export class Institucion{
    

    /**
     *
     */
    constructor(public nit: string,
        public dane: string,
        public nombre:string,
        public codigoMunicipio:string,        
        public sedes: Sede[],
        public paginaWeb:string ) {       

    }


}
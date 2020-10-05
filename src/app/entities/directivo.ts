import { Sede } from './sede';

export class Directivo{    /**
     *
     */
    constructor(    
        public sede:string,    
        public numeroCedula:string,
        public nombres:string,
        public apellidos: string,
        public cargo: string,
           
    ) {
        
        
    }

}
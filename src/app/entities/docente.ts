import { Asignatura } from './asignatura';

export class Docente{
    /**
     *
     */
    constructor(
        public institucionKey: number,
        public numeroCedula: string,
        public nombres:string,
        public apellidos: string,
        public asignaturas: Asignatura[]

    ) {
        
    }

}
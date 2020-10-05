export class Estudiante{

    /**
     *
     */
    constructor(
        public tipoDocumento: string,
        public identificacion:  string,
        public apellidos: string,
        public nombres: string,
        public grado : string,
        public grupo: string
    ) {
    }
}
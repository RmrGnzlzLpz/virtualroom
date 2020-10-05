export class Estudiante{

    /**
     *
     */
    constructor(
        public institucionNIT: string,
        public sede: string,
        public tipoDocumento: string,
        public identificacion:  string,
        public nombres: string,
        public apellidos: string,
        public grado : string,
        public grupo: string
    ) {
    }
}
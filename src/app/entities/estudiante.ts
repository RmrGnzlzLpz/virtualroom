export class Estudiante{
    public errado: boolean;
    /**
     *
     */
    constructor(
        public tipoDocumento: string,
        public identificacion:  string,
        public apellidos: string,
        public nombres: string,
        public grado : string,
        public grupo: string,
        public institucionNit: string,
        public sede: string,
        public email:string,
    ) {
        if (!tipoDocumento || !identificacion || !apellidos || !nombres || !grado || !grupo) {
            this.errado = true;
        }
    }
}
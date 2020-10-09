import * as XLSX from 'xlsx';
import { Component, Input } from '@angular/core';
import { Sede } from 'src/app/entities/sede';
import { Directivo } from 'src/app/entities/directivo';
import { Institucion } from 'src/app/entities/institucion';
import { ThrowStmt } from '@angular/compiler';
import { InicializarDatosDeEntidadServiceService } from 'src/app/services/inicializar-datos-de-entidad-service.service';
import { Docente } from 'src/app/entities/docente';
import { Estudiante } from 'src/app/entities/estudiante';
import { Grupo } from 'src/app/entities/grupo';
import { Asignatura } from 'src/app/entities/asignatura';
type AOA = any[][];
@Component({
  selector: 'app-inicializar-datos-de-entidades',
  templateUrl: './inicializar-datos-de-entidades.component.html',
  styleUrls: ['./inicializar-datos-de-entidades.component.css']
})
export class InicializarDatosDeEntidadesComponent {
  sedes: Sede[];
  directivo: Directivo;
  directivos: Directivo[];
  docentes: Docente[];
  estudiantes: Estudiante[];
  asignaturas: Asignatura[];
  grupos: Grupo[];
  institucion: Institucion;
  @Input() entidad: string;
  isValid: boolean = true;

  constructor(private inicializarDatosDeEntidadService: InicializarDatosDeEntidadServiceService) {
    this.sedes = new Array<Sede>();
    this.directivos = new Array<Directivo>();
    this.estudiantes = new Array<Estudiante>();
    this.asignaturas = new Array<Asignatura>();
    this.docentes = new Array<Docente>();
    this.grupos = new Array<Grupo>();
  }



  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {


    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      let data = [[[1, 2], [3, 4]]];

      for (let index = 0; index < 7; index++) {
        const wsname: string = wb.SheetNames[index];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        data[index] = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      }
      /* grab first sheet */
      // const wsname: string = wb.SheetNames[0];

      /* save data */
      // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      this.trasnformarDatosDeInstitucion(data);
      console.log(this.isValid);

      if (this.isValid) {
        console.log("Directivos")

        this.transformarDatosDeDirectivos(data[2])
        if (this.isValid) {
          console.log("Docentes")

          this.transformarDatosDeDocentes(data[3]);
          if (this.isValid) {
            console.log("Estudiantes")
            this.transformarDatosDeEstudiantes(data[4]);

          }
          if (this.isValid) {
            console.log("Grupos")
            this.transformarDatosDeGrupos(data[5]);

          }
          if (this.isValid) {
            console.log("Asignaturas")
            this.transformarDatosAsignaturas(data[6]);

          }
        }
      }

    };
    reader.readAsBinaryString(target.files[0]);
  }

  trasnformarDatosDeInstitucion(data: any) {


    let cont = 0;
    data[0].some(x => {
      cont++;
      if (!x[0] || !x[1]
        || !x[2] || !x[3]) {
        console.log(x); alert("Institucion, datos inválidos linea: " + cont);
        this.isValid = false;
        return true;
      } else {
        this.institucion = new Institucion(x[0].toString(), x[1].toString()
          , x[2].toString(), x[3].toString(), x[4].toString());

      }
    })
    cont = 0;
    data[1].some(x => {
      cont++;
      if (!x[0]) {
        console.log(x); alert("Sedes, datos inválidos linea: " + cont);
        this.isValid = false;
        return true;
      } else {
        this.sedes.push(new Sede(this.institucion.nit, x[0].toString(), x[2], x[3]));

      }
    })
    this.sedes.shift();
    this.institucion.sedes = this.sedes;
    console.log(this.institucion)

  }

  transformarDatosDeDirectivos(data: any) {
    let cont = 0;
    data.some(x => {
      cont++;
      if (!x[0] || !x[1]
        || !x[2] || !x[3] || !x[4] || !x[5]) {
        alert("Directivos, datos inválidos linea: " + cont);
        this.isValid = false;
        return true;
      } else {
        this.directivos.push(new Directivo(x[0].toString(), x[3].toString()
          , x[1].toString(), x[2].toString(), x[4].toString(), x[5].toString()));

      }
    })
    this.directivos.shift();
  }

  transformarDatosDeDocentes(data: any) {
    let cont = 0;
    data.some(x => {
      cont++;
      if (!x[0] || !x[1]
        || !x[2] || !x[3]) {
        console.log(x);
        alert("Docentes, datos inválidos linea: " + cont);
        this.isValid = false;
        return true;
      } else {
        this.docentes.push(new Docente(x[2].toString(), x[0].toString()
          , x[1].toString(), x[3].toString()));

      }
    })
    this.docentes.shift();
  }

  transformarDatosDeEstudiantes(data: any) {
    let cont = 0;
    console.log(data);

    data.some(x => {
      cont++;
      if (!x[0] || !x[1]
        || !x[2] || !x[3] || !x[4] || !x[5].toString() || !x[6] || !x[7]) {
        alert("Estudiantes, datos inválidos linea: " + cont);
        this.isValid = false;
        return true;
      } else {
        this.estudiantes.push(new Estudiante(x[0].toString(), x[1].toString()
          , x[2].toString(), x[3].toString(), x[4].toString(), x[5].toString(), this.institucion.nit, x[6].toString(), x[7].toString()));

      }
    })
    console.log(this.estudiantes);
    this.estudiantes.shift();
  }
  transformarDatosDeGrupos(data: any) {
    let cont = 0;
    data.some(x => {
      cont++;
      if (!x[0] || !x[1]
        || x[2] === undefined || x[3] === undefined) {
        alert("Grupos, datos inválidos linea: " + cont);
        this.isValid = false;
        return true;
      } else {
        this.grupos.push(new Grupo(x[0].toString(), x[1].toString()
          , x[2].toString(), x[3].toString()));

      }
    })
    this.grupos.shift();
    console.log(this.grupos);
  }
  transformarDatosAsignaturas(data: any) {
    let cont = 0;
    data.some(x => {
      cont++;
      if (!x[0] || x[1] === undefined) {
        console.log(x);
        alert("Asignaturas, datos inválidos linea: " + cont);
        this.isValid = false;
        return true;
      } else {
        let grados = x[1].toString().split(';')
        this.asignaturas.push(new Asignatura(x[0].toString(), grados));
      }
    })
    this.asignaturas.shift();
    console.log(this.asignaturas);

  }
  subir() {
    this.addInstitucion();
    this.addDirectivos();
    this.addDocentes();
    this.addEstudiantes();
    this.addGrupos();
    this.addAsignaturas();
  }

  addInstitucion() {
    this.inicializarDatosDeEntidadService
      .RegistrarInstitucion(this.institucion).subscribe(x => { });
  }
  addDirectivos() {
    this.inicializarDatosDeEntidadService
      .RegistrarDirectivos({ directivos: this.directivos, nit: this.institucion.nit }).subscribe(x => { });

  }
  addDocentes() {
    this.inicializarDatosDeEntidadService
      .RegistrarDocentes({ docentes: this.docentes, nit: this.institucion.nit }).subscribe(x => { });
  }
  addEstudiantes() {
    this.inicializarDatosDeEntidadService
      .RegistrarEstudiantes({ nit: this.institucion.nit, estudiantes: this.estudiantes }).subscribe(x => { });
  }
  addGrupos() {
    this.inicializarDatosDeEntidadService
      .RegistrarGrupos({ grupos: this.grupos, nit: this.institucion.nit }).subscribe(x => { });
  }
  addAsignaturas() {
    this.inicializarDatosDeEntidadService
      .RegistrarAsignaturas({ nit: this.institucion.nit, asignaturas: this.asignaturas }).subscribe(x => { });
  }
  // export(): void {
  //   var data
  //   /* generate worksheet */
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);
  // }

}


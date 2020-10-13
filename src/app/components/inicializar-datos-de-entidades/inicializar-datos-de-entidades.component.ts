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
import { debounceTime } from 'rxjs/operators';
type AOA = any[][];

interface DatoInvalido {
  indice: number;
}
@Component({
  selector: 'app-inicializar-datos-de-entidades',
  templateUrl: './inicializar-datos-de-entidades.component.html',
  styleUrls: ['./inicializar-datos-de-entidades.component.css']
})
export class InicializarDatosDeEntidadesComponent {
  public datosInvalidosSede: DatoInvalido[] = [];
  public datosInvalidosDocente: DatoInvalido[] = [];
  public datosInvalidosDirectivo: DatoInvalido[] = [];
  public datosInvalidosEstudiante: DatoInvalido[] = [];
  public datosInvalidosAsignatura: DatoInvalido[] = [];
  public datosInvalidosGrupo: DatoInvalido[] = [];
  sedes: Sede[];
  directivo: Directivo;
  directivos: Directivo[];
  docentes: Docente[];
  estudiantes: Estudiante[];
  asignaturas: Asignatura[];
  grupos: Grupo[];
  institucion: Institucion;
  @Input() entidad: string;
  isValid: boolean = false;
  invalidTypeFile: boolean;
  nombreArchivo: string = "";
  errorMessage: string = "";
  responseAlmacenamiento: string;
  classResponse: string;

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
    this.inicializarCampos();
    if (!this.checkfile(evt.target)) return true;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      this.errorMessage = "Absténganse de subir varios archivos a la vez, gracias.";
      this.inicializarCampos();
      return true;

    }
    this.nombreArchivo = target.files[0].name;
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

      if (this.isValid) {

        this.transformarDatosDeDirectivos(data[2])
        if (this.isValid) {

          this.transformarDatosDeDocentes(data[3]);
          if (this.isValid) {
            this.transformarDatosDeEstudiantes(data[4]);

          }
          if (this.isValid) {
            this.transformarDatosDeGrupos(data[5]);

          }
          if (this.isValid) {
            this.transformarDatosAsignaturas(data[6]);

          }
        }
      }

    };
    reader.readAsBinaryString(target.files[0]);
  }
  private inicializarCampos() {
    this.errorMessage = null;
    this.isValid = false;
    this.institucion = null;
    this.datosInvalidosSede = [];
    this.datosInvalidosDocente = [];
    this.datosInvalidosDirectivo = [];
    this.datosInvalidosEstudiante = [];
    this.datosInvalidosAsignatura = [];
    this.datosInvalidosGrupo = [];
    this.responseAlmacenamiento = "";
    this.classResponse = '';
  }

  private checkfile(sender) {
    var validExts = new Array(".xlsx", ".xls");

    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      this.errorMessage = "Se ha cargado un archivo no soportado, absténgase de subir archivos que no contengan la extension" +
        " <b>.XLSX</b> ó <b>.XLS</b>, gracias."
      this.inicializarCampos();
      return false;
    }
    else return true;
  }
  trasnformarDatosDeInstitucion(data: any) {

    this.isValid = true;
    let cont = 0;
    data[0].some(x => {
      cont++;
      if (!x[0] || !x[1]
        || !x[2] || !x[3]) {
        this.isValid = false;
      } else {
        this.institucion = new Institucion(x[0]?.toString(), x[1]?.toString()
          , x[2]?.toString(), x[3]?.toString(), x[4]?.toString());
      }
    })
    cont = 0;
    data[1].some(x => {
      cont++;
      if (!x[0]) {
        this.isValid = false;
        this.datosInvalidosSede.push({ indice: cont });
      } else {
        this.sedes.push(new Sede(this.institucion.nit, x[0]?.toString(), x[2]?.toString(), x[3]?.toString()));
      }
    })
    this.sedes.shift();
    this.institucion.sedes = this.sedes;

  }

  transformarDatosDeDirectivos(data: any) {
    let cont = 0;
    data.some(x => {
      cont++;
      if (!x[0] || !x[1]
        || !x[2] || !x[3] || !x[4] || !x[5]) {
        this.isValid = false;
        this.datosInvalidosDirectivo.push({ indice: cont });
      } else {
        this.directivos.push(new Directivo(x[0]?.toString(), x[3]?.toString()
          , x[1]?.toString(), x[2]?.toString(), x[4]?.toString(), x[5]?.toString()));

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
        this.isValid = false;
        this.datosInvalidosDocente.push({ indice: cont });
      } else {
        this.docentes.push(new Docente(x[2]?.toString(), x[0]?.toString()
          , x[1]?.toString(), x[3]?.toString()));

      }
    })
    this.docentes.shift();
  }

  transformarDatosDeEstudiantes(data: any) {
    let cont = 0;

    data.some(x => {
      cont++;
      if (!x[0] || !x[1]
        || !x[2] || !x[3] || !x[4] || !x[5]?.toString() || !x[6] || !x[7]) {
        this.isValid = false;
        this.datosInvalidosEstudiante.push({ indice: cont });
      } else {
        this.estudiantes.push(new Estudiante(x[0]?.toString(), x[1]?.toString()
          , x[2]?.toString(), x[3]?.toString(), x[4]?.toString(), x[5]?.toString(), this.institucion.nit, x[6]?.toString(), x[7]?.toString()));

      }
    })
    this.estudiantes.shift();
  }
  transformarDatosDeGrupos(data: any) {
    let cont = 0;
    data.some(x => {
      cont++;
      if (!x[0] || !x[1]
        || x[2] === undefined || x[3] === undefined) {
        this.isValid = false;
        this.datosInvalidosGrupo.push({ indice: cont });
      } else {
        this.grupos.push(new Grupo(x[0]?.toString(), x[1]?.toString()
          , x[2]?.toString(), x[3]?.toString()));

      }
    })
    this.grupos.shift();
  }
  transformarDatosAsignaturas(data: any) {
    let cont = 0;
    data.some(x => {
      cont++;
      if (!x[0] || x[1] === undefined) {
        this.isValid = false;
        this.datosInvalidosAsignatura.push({ indice: cont });
      } else {
        let grados = x[1]?.toString().split(';')
        this.asignaturas.push(new Asignatura(x[0]?.toString(), grados));
      }
    })
    this.asignaturas.shift();
  }
  subir() {
    if (this.isValid && this.institucion) {
      this.addInstitucion();
    }
  }

  addInstitucion() {
    this.inicializarDatosDeEntidadService
      .RegistrarInstitucion(this.institucion).pipe(debounceTime(1500)).subscribe(x => {
        if (x.estado) {
          this.addDocentes();
        } else {
          this.responseAlmacenamiento = x.mensaje;
          this.classResponse = 'danger';
        }
      }, error => {
        this.responseAlmacenamiento = error.error.mensaje;
        this.classResponse = 'danger';
      });
  }
  addDocentes() {
    this.inicializarDatosDeEntidadService
      .RegistrarDocentes({ docentes: this.docentes, nit: this.institucion.nit }).pipe(debounceTime(1500))
      .subscribe(x => {
        if (x.estado) {
          this.addAsignaturas();
        } else {
          this.responseAlmacenamiento = x.mensaje;
          this.classResponse = 'danger';
        }
      }, error => {
        this.responseAlmacenamiento = error.error.mensaje;
        this.classResponse = 'danger';
      });
  }
  addAsignaturas() {
    this.inicializarDatosDeEntidadService
      .RegistrarAsignaturas({ nit: this.institucion.nit, asignaturas: this.asignaturas }).pipe(debounceTime(1500))
      .subscribe(x => {
        if (x.estado) {
          this.addGrupos();
        } else {
          this.responseAlmacenamiento = x.mensaje;
          this.classResponse = 'danger';
        }
      }, error => {
        this.responseAlmacenamiento = error.error.mensaje;
        this.classResponse = 'danger';
      });
  }
  addGrupos() {
    this.inicializarDatosDeEntidadService
      .RegistrarGrupos({ grupos: this.grupos, nit: this.institucion.nit }).pipe(debounceTime(1500))
      .subscribe(x => {
        if (x.estado) {
          this.addEstudiantes();
        } else {
          this.responseAlmacenamiento = x.mensaje;
          this.classResponse = 'danger';
        }
      }, error => {
        this.responseAlmacenamiento = error.error.mensaje;
        this.classResponse = 'danger';
      });
  }

  addEstudiantes() {
    this.inicializarDatosDeEntidadService
      .RegistrarEstudiantes({ nit: this.institucion.nit, estudiantes: this.estudiantes }).pipe(debounceTime(1500))
      .subscribe(x => {
        if (x.estado) {
          this.addDirectivos();
        } else {
          this.responseAlmacenamiento = x.mensaje;
          this.classResponse = 'danger';
        }
      }, error => {
        this.responseAlmacenamiento = error.error.mensaje;
        this.classResponse = 'danger';
      });
  }
  addDirectivos() {
    this.inicializarDatosDeEntidadService
      .RegistrarDirectivos({ directivos: this.directivos, nit: this.institucion.nit }).pipe(debounceTime(1500))
      .subscribe(x => {
        if (x.estado) {
          this.responseAlmacenamiento = 'Se han almacenado con éxito los datos.'
          this.classResponse = 'success';
        } else {
          this.responseAlmacenamiento = x.mensaje;
          this.classResponse = 'danger';
        }
      }, error => {
        this.responseAlmacenamiento = error.error.mensaje;
        this.classResponse = 'danger';
      });
  }
}


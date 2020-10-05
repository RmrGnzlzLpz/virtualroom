import * as XLSX from 'xlsx';
import { Component, Input} from '@angular/core';
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
  estudiantes:Estudiante[];
  asignaturas: Asignatura[];
  grupos: Grupo[];
  institucion: Institucion;
  @Input() entidad: string;

  constructor(private inicializarDatosDeEntidadService: InicializarDatosDeEntidadServiceService) {
    this.sedes = new Array<Sede>();
    this.directivos = new Array<Directivo>();
    this.estudiantes = new Array<Estudiante>();
    this.asignaturas = new Array<Asignatura>();
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
      
      for (let index = 0; index < 3; index++) {
        const wsname: string = wb.SheetNames[index];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        console.log(ws);
        
        data[index] = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      }
      /* grab first sheet */
      // const wsname: string = wb.SheetNames[0];

      /* save data */
      // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      
      this.trasnformarDatosDeInstitucion(data); 
      this.transformarDatosDeDirectivos(data[2])
      this.transformarDatosDeDocentes(data[3]);
      this.transformarDatosDeEstudiantes(data[4]);
      this.transformarDatosDeGrupos(data[5])   ;
      this.transformarDatosAsignaturas(data[6]);

    };
    reader.readAsBinaryString(target.files[0]);
  }

  trasnformarDatosDeInstitucion(data :  any){
    data[1].map(x=>{       
      this.sedes.push(new Sede(x[0].toString(),x[1].toString(),x[2].toString()));        
    })
    this.sedes.shift();


    data[0].map(x=>{    
      this.institucion = new Institucion(x[0].toString(),x[1].toString()
      ,x[2].toString(),x[3].toString(),this.sedes,x[4].toString() );             
    })           
    console.log(this.institucion);
  }

  transformarDatosDeDirectivos(data:any){
    data.map(x=>{    
      this.directivos.push( new Directivo(x[0].toString(),x[1].toString()
      ,x[2].toString(),x[3].toString(),x[4].toString()) );             
    }) 
    console.log(this.directivos);
    
  }

  transformarDatosDeDocentes(data:any){
    data.map(x=>{    
      this.docentes.push( new Docente(x[2].toString(),x[0].toString()
      ,x[1].toString()));             
    }) 
    console.log(this.docentes);
    

  }

  transformarDatosDeEstudiantes(data:any){
    data.map(x=>{    
      this.estudiantes.push( new Estudiante(x[0].toString(),x[1].toString()
      ,x[2].toString(),x[3].toString(),x[4].toString(),x[5].toString()));             
    }) 
    console.log(this.estudiantes);
  }
  transformarDatosDeGrupos(data:any){
    data.map(x=>{    
      this.grupos.push( new Grupo(x[0].toString(),x[1].toString()
      ,x[2].toString(),x[3].toString()));             
    }) 
    console.log(this.grupos);
  }
  transformarDatosAsignaturas(data:any){
    data.map(x=>{    
      this.asignaturas.push( new Asignatura(x[0].toString(),x[1].toString()));             
    }) 
    console.log(this.asignaturas);

  }
  subir(){
    this.addInstitucion();
    this.addDirectivos();
    this.addDocentes();
    this.addEstudiantes();
    this.addGrupos();
    this.addAsignaturas();
  }

  addInstitucion(){
    this.inicializarDatosDeEntidadService
    .RegistrarInstitucion(this.institucion).subscribe(x=>{});
  }
  addDirectivos(){
    this.inicializarDatosDeEntidadService
    .RegistrarDirectivos(this.directivos).subscribe(x=>{});

  }
  addDocentes(){
    this.inicializarDatosDeEntidadService
    .RegistrarDocentes(this.docentes).subscribe(x=>{});
  }
  addEstudiantes(){
    this.inicializarDatosDeEntidadService
    .RegistrarEstudiantes(this.estudiantes).subscribe(x=>{});
  }
  addGrupos(){
    this.inicializarDatosDeEntidadService
    .RegistrarGrupos(this.grupos).subscribe(x=>{});
  }
  addAsignaturas(){
    this.inicializarDatosDeEntidadService
    .RegistrarAsignaturas(this.asignaturas).subscribe(x=>{});
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


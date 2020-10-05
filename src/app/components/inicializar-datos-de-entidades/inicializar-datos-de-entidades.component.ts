import * as XLSX from 'xlsx';
import { Component} from '@angular/core';
import { Sede } from 'src/app/entities/sede';
import { Directivo } from 'src/app/entities/directivo';
import { Institucion } from 'src/app/entities/institucion';
import { ThrowStmt } from '@angular/compiler';
import { InicializarDatosDeEntidadServiceService } from 'src/app/services/inicializar-datos-de-entidad-service.service';
type AOA = any[][];
@Component({
  selector: 'app-inicializar-datos-de-entidades',
  templateUrl: './inicializar-datos-de-entidades.component.html',
  styleUrls: ['./inicializar-datos-de-entidades.component.css']
})
export class InicializarDatosDeEntidadesComponent {
  sedes: Sede[];
  rector: Directivo;
  institucion: Institucion;

  constructor(private inicializarDatosDeEntidadService: InicializarDatosDeEntidadServiceService) {
    this.sedes = new Array<Sede>();
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

      
      data[1].map(x=>{       
        this.sedes.push(new Sede(x[0].toString(),x[1].toString(),x[2].toString()));        
      })
      this.sedes.shift();


      data[0].map(x=>{    
        this.institucion = new Institucion(x[0].toString(),x[1].toString()
        ,x[2].toString(),x[3].toString(),this.sedes,x[4].toString() );             
      })           
      console.log(this.institucion);
      

    };
    reader.readAsBinaryString(target.files[0]);
  }

  subir(){
    this.inicializarDatosDeEntidadService
    .RegistrarInstitucion(this.institucion).subscribe(x=>{});
  }
  export(): void {
    var data
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}


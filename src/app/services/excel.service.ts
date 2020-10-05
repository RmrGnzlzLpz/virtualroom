import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public importFromFile(bstr: string, numero: number): XLSX.AOA2SheetOpts {
    // Libro
    const libro: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    // Primera hoja
    const nombreHoja: string = libro.SheetNames[numero];
    const hoja: XLSX.WorkSheet = libro.Sheets[nombreHoja];

    // Data
    const datos = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(hoja, { header: 1 }));
    return datos;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSedesUpload(event:any)
  {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length != 1) throw new Error("Un único archivo");

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const arrString: string = e.target.result;
    }
  }

}

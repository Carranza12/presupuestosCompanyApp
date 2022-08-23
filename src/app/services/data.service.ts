import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getUnidades(){
    return [
      {
        text:"Pieza",
        value:"pzas"
      },
      {
        text:"Lote",
        value:"lotes"
      },
      {
        text:"Metro lineal",
        value:"ml"
      },
      {
        text:"Metro cuadrado",
        value:"m2"
      },
      {
        text:"Metro cúbico",
        value:"m3"
      }
    ]
  }
}

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

  public getClientesEnEspera(){
    return [
      {
        full_name:"Javier Carranza",
        email:"Javier@mail.com",
        phone:"8715741717",
        type_job:"Ampliación de una casa/habitación",
        how_many_units:1,
        land_measures:"100 metros cúbicos",
        budget:"25,000-35,000",
        details:"quiero una remodelacion completa de un baño, para añadirle una mejor fachada y que se vea bonito"
      },
      {
        full_name:"Eduardo Carranza",
        email:"eduardo@mail.com",
        phone:"8715741717",
        type_job:"Ampliación de una casa/habitación",
        how_many_units:1,
        land_measures:"100 metros cúbicos",
        budget:"25,000-35,000",
        details:"quiero una remodelacion completa de un baño, para añadirle una mejor fachada y que se vea bonito"
      },
      {
        full_name:"Alan Carranza",
        email:"Añan@mail.com",
        phone:"8715741717",
        type_job:"Ampliación de una casa/habitación",
        how_many_units:1,
        land_measures:"100 metros cúbicos",
        budget:"25,000-35,000",
        details:"quiero una remodelacion completa de un baño, para añadirle una mejor fachada y que se vea bonito"
      },
      {
        full_name:"Fer Carranza",
        email:"fer@mail.com",
        phone:"8715741717",
        type_job:"Ampliación de una casa/habitación",
        how_many_units:1,
        land_measures:"100 metros cúbicos",
        budget:"25,000-35,000",
        details:"quiero una remodelacion completa de un baño, para añadirle una mejor fachada y que se vea bonito"
      },
      {
        full_name:"Juan Carranza",
        email:"Juan@mail.com",
        phone:"8715741717",
        type_job:"Ampliación de una casa/habitación",
        how_many_units:1,
        land_measures:"100 metros cúbicos",
        budget:"25,000-35,000",
        details:"quiero una remodelacion completa de un baño, para añadirle una mejor fachada y que se vea bonito"
      },
      {
        full_name:"Max Carranza",
        email:"max@mail.com",
        phone:"8715741717",
        type_job:"Ampliación de una casa/habitación",
        how_many_units:1,
        land_measures:"100 metros cúbicos",
        budget:"25,000-35,000",
        details:"quiero una remodelacion completa de un baño, para añadirle una mejor fachada y que se vea bonito"
      },
      {
        full_name:"alberto Carranza",
        email:"alberto@mail.com",
        phone:"8715741717",
        type_job:"Ampliación de una casa/habitación",
        how_many_units:1,
        land_measures:"100 metros cúbicos",
        budget:"25,000-35,000",
        details:"quiero una remodelacion completa de un baño, para añadirle una mejor fachada y que se vea bonito"
      },
      {
        full_name:"joprge Carranza",
        email:"jprge@mail.com",
        phone:"8715741717",
        type_job:"Ampliación de una casa/habitación",
        how_many_units:1,
        land_measures:"100 metros cúbicos",
        budget:"25,000-35,000",
        details:"quiero una remodelacion completa de un baño, para añadirle una mejor fachada y que se vea bonito"
      }
    ]
  }
}

import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GetCollectionsService {
  public presupuestos:any;
  public clientes:any;
  constructor(private _firebase:FirebaseService) { }

  public async getPresupuestos(): Promise<any[]> {
    if (this.presupuestos) {
      return this.presupuestos;
    }
    this.presupuestos = [];
    try {
      const ref = this._firebase.getCollectionRef('presupuestos');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(ref, this.presupuestos);
    } catch (error) {
      return [];
    }
  }

  public async getClients(): Promise<any[]> {
    if (this.clientes) {
      return this.clientes;
    }
    this.clientes = [];
    try {
      const ref = this._firebase.getCollectionRef('clientes');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(ref, this.clientes);
    } catch (error) {
      return [];
    }
  }
}

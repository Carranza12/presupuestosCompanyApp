import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class PresupuestosPendientesService {
  public presupuestosPendientes: any;
  constructor(private _firebase: FirebaseService) {}

  public async getPresupuestosPendientes(): Promise<any[]> {
    if (this.presupuestosPendientes) {
      return this.presupuestosPendientes;
    }
    this.presupuestosPendientes = [];
    try {
      const ref = this._firebase.getCollectionRef('presupuestos_pendientes');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(
        ref,
        this.presupuestosPendientes
      );
    } catch (error) {
      return [];
    }
  }

  public async setPresupuestoPendiente(clienteEspera: any): Promise<any> {
    const res = await this._firebase.addDocument(
      'presupuestos_pendientes',
      clienteEspera
    );
    return res;
  }
}

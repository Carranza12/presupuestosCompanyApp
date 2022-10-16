import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosAprobadosService {
  public presupuestosAprobados: any;
  constructor(private _firebase:FirebaseService) { }
  public async getPresupuestosAprobados(): Promise<any[]> {
    if (this.presupuestosAprobados) {
      return this.presupuestosAprobados;
    }
    this.presupuestosAprobados = [];
    try {
      const ref = this._firebase.getCollectionRef('presupuestos_aprobados');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(
        ref,
        this.presupuestosAprobados
      );
    } catch (error) {
      return [];
    }
  }
}

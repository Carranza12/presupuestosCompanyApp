import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosCotizadosService {
  public presupuestosCotizados: any;
  constructor(private _firebase:FirebaseService) { }

  public async getPresupuestosCotizados(): Promise<any[]> {
    if (this.presupuestosCotizados) {
      return this.presupuestosCotizados;
    }
    this.presupuestosCotizados = [];
    try {
      const ref = this._firebase.getCollectionRef('presupuestos_cotizados');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(ref, this.presupuestosCotizados);
    } catch (error) {
      return [];
    }
  }
}

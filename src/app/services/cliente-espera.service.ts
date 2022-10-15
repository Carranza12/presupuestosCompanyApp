import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteEsperaService {
  public clientesEspera: any;
  constructor(private _firebase: FirebaseService) {}

  public async getClientesEspera(): Promise<any[]> {
    if (this.clientesEspera) {
      return this.clientesEspera;
    }
    this.clientesEspera = [];
    try {
      const ref = this._firebase.getCollectionRef('clientes_en_espera');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(ref, this.clientesEspera);
    } catch (error) {
      return [];
    }
  }

  public async removeClienteEnEspera(id: string): Promise<any> {
    const res = await this._firebase.deleteDocument('clientes_en_espera', id);
    return res;
  }
}

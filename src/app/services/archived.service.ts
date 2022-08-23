import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivedService {

  public archived:any;
  constructor(private _firebase:FirebaseService) { }

  

  public async getArchiveds(): Promise<any[]> {
    if (this.archived) {
      return this.archived;
    }
    this.archived = [];
    try {
      const ref = this._firebase.getCollectionRef('archiveds');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(ref, this.archived);
    } catch (error) {
      return [];
    }
  }
  
}

import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public profile:any;
  constructor(private _firebase:FirebaseService) { }

  async editUser(data:any){
    return await this._firebase.updateDocument('profile',data,'YsSWpD1p8xWJis8ptIi8');
  }

  public async getProfileData(): Promise<any[]> {
    if (this.profile) {
      return this.profile;
    }
    this.profile = [];
    try {
      const ref = this._firebase.getCollectionRef('profile');
      ref.orderBy('date', 'desc');
      return await this._firebase.generateData(ref, this.profile);
    } catch (error) {
      return [];
    }
  }
}

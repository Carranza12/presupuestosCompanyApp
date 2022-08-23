import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public userAuth: any;
  public user: any;
  public collectionUser: string = 'users';

  constructor(
    private _auth: AngularFireAuth,
    public _db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  createID() {
    return this._db.createId();
  }

  login(email: string, password: string): Promise<any> {
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this._auth.signOut();
  }

  register(email: string, password: string): Promise<any> {
    return this._auth.createUserWithEmailAndPassword(email, password);
  }

  recovery(email: string): Promise<any> {
    return this._auth.sendPasswordResetEmail(email);
  }

  getUser(): Promise<any> {
    if (this.user) {
      return Promise.resolve(this.user);
    } else {
      return new Promise((resolve) => {
        this._auth.user.subscribe((userAuth) => {
          if (userAuth) {
            this.userAuth = userAuth;
            this.getDocument(this.collectionUser, this.userAuth.uid).then(
              (document) => {
                const user = document.data();
                user.id = document.id;
                this.user = user;
                resolve(this.user);
              }
            );
          } else {
            resolve('');
          }
        });
      });
    }
  }

  getRef(patch: string): any {
    return this.storage.ref(patch);
  }

  public removeImageOfStorage(path: any): any {
    return this.storage.ref(path).delete();
  }

  uploadFile(ref: any, data: any): Promise<any> {
    return ref.put(data);
  }

  addDocument(collection: string, data: any) {
    return this._db.collection(collection).add(data);
  }

  addDocumentWithID(collection: string, data: any, id: any) {
    return this._db.collection(collection).doc(id).set(data);
  }

  deleteDocument(collection: any, id: any) {
    return this._db.collection(collection).doc(id).delete();
  }

  updateDocument(collection: any, data: any, id: any) {
    return this._db.collection(collection).doc(id).update(data);
  }

  getCollectionWithCondition(
    collection: string,
    variable: string,
    condition: any,
    value: any
  ): Promise<any> {
    return this._db
      .collection(collection)
      .ref.where(variable, condition, value)
      .get();
  }

  getCollectionWithCondition2(
    collection: string,
    variable: string,
    condition: any,
    value: any,
    variable2: string,
    condition2: any,
    value2: any
  ): Promise<any> {
    return this._db
      .collection(collection)
      .ref.where(variable, condition, value)
      .where(variable2, condition2, value2)
      .get();
  }

  getCollectionWithCondition3(
    collection: string,
    variable: string,
    condition: any,
    value: any,
    variable2: string,
    condition2: any,
    value2: any,
    variable3: string,
    condition3: any,
    value3: any
  ) {
    return this._db
      .collection(collection)
      .ref.where(variable, condition, value)
      .where(variable2, condition2, value2)
      .where(variable3, condition3, value3)
      .get();
  }

  getCollectionOrderBy(collection: string, variable: string, order: any) {
    return this._db.collection(collection).ref.orderBy(variable, order);
  }

  getCollection(collection: any) {
    return this._db.collection(collection).snapshotChanges();
  }
  getCollectionValues(collection: any) {
    return this._db.collection(collection).valueChanges();
  }
  getDocument(collection: any, id: any): Promise<any> {
    return this._db.collection(collection).doc(id).ref.get();
  }

  getDocumentWithChanges(collection: any, id: any) {
    return new Promise((resolve) => {
      return this._db
        .collection(collection)
        .doc(id)
        .ref.onSnapshot((document) => {
          const data = document.data();
          if (document.exists) {
            resolve(data);
          }
        });
    });
  }

  getCollectionRef(collection: any) {
    return this._db.collection(collection).ref;
  }

  getDocumentRef(collection: any, id: any) {
    return this._db.collection(collection).doc(id).ref;
  }

  generateData(ref: any, data: any): Promise<any[]> {
    return new Promise((resolve) => {
      ref.onSnapshot((collection: any) => {
        collection.docChanges().forEach((document: any) => {
          const doc = document.doc.data();
          doc.id = document.doc.id;
          switch (document.type) {
            case 'added':
              data.push(doc);
              break;
            case 'modified':
              const modified = data.findIndex((dd: any) => dd.id === doc.id);
              if (modified >= 0) {
                data[modified] = doc;
              }
              break;
            case 'removed':
              const removed = data.findIndex((dd: any) => dd.id === doc.id);
              if (removed >= 0) {
                data.splice(removed, 1);
              }
              break;
            default:
              break;
          }
        });
        data = data.sort((aa: any, bb: any) => {
          return aa.dateCreation - bb.dateCreation;
        });
        resolve(data);
      });
    });
  }

  generateItem(ref: any): Promise<any> {
    return new Promise((resolve) => {
      ref.get().then((document: any) => {
        const data = document.data();
        data.id = document.id;
        resolve(data);
      });
    });
  }

  generateDataWithCondition(ref: any, data: any): Promise<any[]> {
    return new Promise((resolve) => {
      ref.where('userId', '==', this.user.id).onSnapshot((collection: any) => {
        collection.docChanges().forEach((document: any) => {
          const doc = document.doc.data();
          doc.id = document.doc.id;
          data.push(doc);
          switch (document.type) {
            case 'added':
              data.push(doc);
              break;
            case 'modified':
              const modified = data.findIndex((dd: any) => dd.id === doc.id);
              if (modified >= 0) {
                data[modified] = doc;
              }
              break;
            case 'removed':
              const removed = data.findIndex((dd: any) => dd.id === doc.id);
              if (removed >= 0) {
                data.splice(removed, 1);
              }
              break;
            default:
              break;
          }
        });
        data = data.sort((aa: any, bb: any) => {
          return aa.dateCreation - bb.dateCreation;
        });
        resolve(data);
      });
    });
  }

}

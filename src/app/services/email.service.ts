import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  sendPdf(body:any){
    console.log('enviamos al back: ', body);
    return this.http.post('http://localhost:3000/email', body);
    
    
  }
}

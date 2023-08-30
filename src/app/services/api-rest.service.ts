import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private loginURL:string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
  private createURL:string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
  private API_KEY:string = 'AIzaSyAQRRKOsKRuxWU5jNXleKaTyT3EigWkK7g'

  constructor(private http:HttpClient) { }

  login(email: string, password: string){
    return this.http.post(`${this.loginURL}${this.API_KEY}`,
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    )
  }

  register(email: string, password: string){
    return this.http.post(`${this.createURL}${this.API_KEY}`,
      {
        email:email,
        password:password,
        returnSecureToken:true
      }
    )
  }
}

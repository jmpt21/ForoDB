import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable( {
  providedIn: 'root'
} )
export class ApiRestService {
  private loginURL : string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
  private createUserURL : string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
  private API_KEY : string = 'AIzaSyAQRRKOsKRuxWU5jNXleKaTyT3EigWkK7g'

  private baseURL : string = 'https://firestore.googleapis.com/v1/projects/foro-dudas-itsch/databases/(default)/documents/'
  private questionsURL : string = 'preguntas'

  constructor(private http : HttpClient) {
  }

  login(email : string, password : string) {
    return this.http.post( `${ this.loginURL }${ this.API_KEY }`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }

  register(email : string, password : string) {
    return this.http.post( `${ this.createUserURL }${ this.API_KEY }`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }

  getAllQuestions(){
    return this.http.get<Object>(`${this.baseURL}${this.questionsURL}?pageSize=1000`)
  }

  createQuestion(categoria : string, pregunta: string, fecha : string, correo : string){
    const newDoc = {
      fields : {
        categoria : {
          stringValue : categoria
        },
        correo : {
          stringValue : correo
        },
        fecha : {
          timestampValue : fecha
        },
        pregunta : {
          stringValue : pregunta
        }
      }
    }

    return this.http.post(`${this.baseURL}${this.questionsURL}`, newDoc)
  }

  updateQuestion(pregunta: string, id : string){
    return this.http.patch(`${this.baseURL}${this.questionsURL}/${id}?updateMask.fieldPaths=pregunta`,
      {
        fields : {
          pregunta : {
            stringValue : pregunta
          }
        }
      }
    )
  }

  deleteQuestion(id : number){
    return this.http.delete(`${this.baseURL}${this.questionsURL}/${id}`)
  }
}

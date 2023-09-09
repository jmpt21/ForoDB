import { Component, OnInit } from '@angular/core';
import { ApiRestService } from "../../services/api-rest.service";
import { catchError, throwError } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  /*questions = [
    {id: 1, question: '¿Cuál es la capital de Francia?'},
    {id: 2, question: '¿De qué está hecha la luna?'},
    {id: 3, question: '¿De qué está hecho Marte?'},
  ]*/
  questions: string[] = [
    '¿Cuál es la capital de Francia?',
    '¿De qué está hecha la luna?',
    '¿De qué está hecho Marte?',
  ]

  constructor(private api : ApiRestService) {}

  getAll(){
    this.api.getAllQuestions()
      .pipe(
        catchError(() => {
          return throwError(() => {})
        })
      )
      .subscribe(
        (data) => {
          let d = Object.values(data)[0][0]['fields']

          let json = {
            categoria : d['categoria']['stringValue'],
            pregunta : d['pregunta']['stringValue'],
            fecha : d['fecha']['timestampValue'],
            correo : d['correo']['stringValue']
          }

          console.log(json)
        }
      )
  }

  ngOnInit() : void {
    this.getAll()
    //this.q = this.api.getAllQuestions()
  }
}

import { Component, ElementRef, OnInit, ViewChild, afterRender } from '@angular/core';
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

  editMode: boolean = true
  editField: any | undefined

  questionsList: any = []

  categoryNew: string = ''
  newP: string = ''

  categoryEdit: string = ''
  editP: string = ''

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
          //console.log(Object.values(data)[0])
          this.questionsList = Object.values(data)[0].filter((p : any) => p.hasOwnProperty("fields"))
          //console.log(Object.values(data))
          /*this.questionsList = data.documents.map((p: any)=>({
            preguntas: p.fields.pregunta.stringValue,
            categoria: p.fields.categoria.stringValue,
            correo: p.fields.correo.stringValue,
            fecha: p.fields.fecha.timestampValue,
            id: p.name.split("/").pop(),
          }))*/

        }
      )
  }

  crearPregunta(){
    if ( this.categoryNew == '' || this.newP == '' ){
      alert('Sin valores')
      return
    }

    const correo = localStorage.getItem('correo') || ''

    this.api.createQuestion(this.categoryNew, this.newP, new Date().toISOString(), correo).pipe().subscribe({
      next: data => {
        console.log(data)
        this.getAll()
      },
      error: error => {
        console.log(error)
      }
    })
  }

  eliminarPregunta(id: number){
    this.api.deleteQuestion(id).pipe().subscribe({
      next: data => {
        console.log(data)
        this.getAll()
      },
      error: error => {
        console.log(error)
      }
    })
  }
  ngOnInit() : void {
    this.getAll()
    //this.q = this.api.getAllQuestions()
  }

  editarPregunta(id: string, category : string, question : string){
    this.api.updateQuestion(category, question, new Date().toISOString(), localStorage.getItem('correo') || '', id).pipe().subscribe({
      next: data => {
        console.log(data)
        this.getAll()
      },
      error: error => {
        console.log(error)
      }
    })
  }

  onClickEdit(n : number){
    window.document.getElementById(`q${n}`)!.innerHTML =
      `
<select id="editSelection" class="form-select bg-dark text-white">
  <option value="General">General</option>
  <option value="Programación">Programación</option>
  <option value="Redes">Redes</option>
</select>
<input type="text" id="editField" class="form-control bg-dark text-white" value="${this.questionsList[n]['fields']['pregunta'].stringValue}"/>
`
    window.document.getElementById(`q${n}`)!.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        //this.editarPregunta(this.questionsList[n]['name'].split('/').pop())
      }
    })
  }
}

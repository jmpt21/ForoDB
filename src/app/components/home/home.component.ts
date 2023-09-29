import { Component, OnInit } from '@angular/core';
import { ApiRestService } from "../../services/api-rest.service";
import { catchError, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
} )
export class HomeComponent implements OnInit {
  questions : string[] = [
    '¿Cuál es la capital de Francia?',
    '¿De qué está hecha la luna?',
    '¿De qué está hecho Marte?',
  ]

  questionsList : any = []

  categoryNew : string = ''
  newP : string = ''

  categoryEdit : string = ''
  editP : string = ''
  idQ : string = ''

  constructor(private api : ApiRestService, private toastr : ToastrService) {
  }

  getAll() {
    this.api.getAllQuestions()
      .pipe(
        catchError( () => {
          return throwError( () => {
          } )
        } )
      )
      .subscribe( (data) => {
          this.questionsList = Object.values( data )[0].filter( (p : any) => p.hasOwnProperty( "fields" ) )
        }
      )
  }

  crearPregunta() {
    if ( this.categoryNew == '' || this.newP == '' ) {
      this.showMessageBox()
      return
    }

    const correo = localStorage.getItem( 'correo' ) || ''

    this.api.createQuestion( this.categoryNew, this.newP, new Date().toISOString(), correo ).pipe().subscribe( {
      next: data => {
        console.log( data )
        this.getAll()
      },
      error: error => {
        console.log( error )
      }
    } )
  }

  eliminarPregunta(id : number) {
    this.api.deleteQuestion( id ).pipe().subscribe( {
      next: data => {
        console.log( data )
        this.getAll()
      },
      error: error => {
        console.log( error )
      }
    } )
  }

  ngOnInit() : void {
    this.getAll()
  }

  modificarPregunta() {
    if ( this.editP == '' ) {
      this.showMessageBox()
      return
    }

    this.api.updateQuestion( this.editP, this.idQ ).pipe().subscribe( {
        next: value => {
          console.log( value )
          this.getAll()
        },
        error: error => {
          console.log( error )
        }
      }
    )
  }

  showMessageBox() {
    this.toastr.error( 'Campos sin valores', 'Error' )
  }

  getPregunta(p : any) {
    this.editP = p['fields']['pregunta']['stringValue']
    this.idQ = p['name'].split( '/' ).pop()
  }
}

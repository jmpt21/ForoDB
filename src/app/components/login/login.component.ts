import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ApiRestService } from "../../services/api-rest.service";
import { catchError, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class LoginComponent {
  title : string = 'Bienvenido a ForumDB'

  email : string = ''
  pass : string = ''

  showError = false
  showLoading = false

  constructor(private router : Router, private api : ApiRestService, private toastr : ToastrService) {
  }

  login() : void {
    this.showLoading = true

    this.api.login( this.email, this.pass ).pipe(
      catchError( (err) => {
        this.toastr.error( 'Error al iniciar sesión', 'Error' )
        this.showLoading = false
        return throwError( () => err )
      } )
    ).subscribe(
      () => {
        this.toastr.success( 'Sesión iniciada', 'Éxito' )
        this.showLoading = false
        this.router.navigate( [ '/home' ] ).then().catch()
        localStorage.setItem( 'correo', this.email )
      }
    )
  }

  quitError() {
    this.showError = false
  }
}

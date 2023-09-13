import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ApiRestService } from "../../services/api-rest.service";
import { catchError, throwError } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title: string = 'Bienvenido a ForumDB'

  email: string = ''
  pass: string = ''

  showError = false
  showLoading = false

  constructor(private router: Router, private api: ApiRestService) {
  }

  login(): void{
    this.showLoading = true

    this.api.login(this.email, this.pass).pipe(
      catchError((err) => {
        this.showError = true
        this.showLoading = false
        return throwError(() => err)
      })
    ).subscribe(
      () => {
        this.showError = false
        this.showLoading = false
        this.router.navigate( ['/home'] ).then().catch()
        localStorage.setItem('correo', this.email)
      }
    )
  }

  quitError(){
    this.showError = false
  }
}

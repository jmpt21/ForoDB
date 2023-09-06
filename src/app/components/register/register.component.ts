import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ApiRestService } from "../../services/api-rest.service";
import { catchError, throwError } from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title: string = 'Bienvenido a ForumDB'

  email: string = ''
  pass: string = ''

  showError = false
  showLoading = false

  constructor(private router: Router, private api: ApiRestService) {
  }

  register(): void{
    this.showLoading = true

    this.api.register(this.email, this.pass).pipe(
      catchError((err) => {
        this.showError = true
        this.showLoading = false
        return throwError(() => err)
      })
    ).subscribe(
      () => {
        this.showError = false
        this.showLoading = false
        this.router.navigate(['/login']).then().catch()
      }
    )
  }

  quitError(){
    this.showError = false
  }
}

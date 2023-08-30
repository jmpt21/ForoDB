import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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

}

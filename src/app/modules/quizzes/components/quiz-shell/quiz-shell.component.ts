import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-quiz-shell',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./quiz-shell.component.scss'],
})
export class QuizShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

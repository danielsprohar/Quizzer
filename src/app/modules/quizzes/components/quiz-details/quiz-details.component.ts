import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Question } from 'src/app/models/question'
import { Quiz } from 'src/app/models/quiz'

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit {
  quiz$: Observable<Quiz>

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.quiz$ = this.route.data.pipe(
      map((data) => {
        const quiz: Quiz = data.quiz
        quiz.questions = data.questions as Question[]
        return quiz
      })
    )
  }
}

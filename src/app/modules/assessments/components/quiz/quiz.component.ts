import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Question } from 'src/app/models/question'
import { Quiz } from 'src/app/models/quiz'
import { QuizService } from 'src/app/modules/quizzes/services/quiz.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { AssessmentService } from '../../services/assessment.service'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  quiz: Quiz

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly assessmentService: AssessmentService,
    private readonly quizService: QuizService,
    private readonly snackbar: SnackbarService,
    private readonly appState: AppStateService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      if (data.quiz && data.questions) {
        this.quiz = data.quiz as Quiz
        this.quiz.questions = data.questions as Question[]
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  nextQuestion() {}

  previousQuestion() {}

  submit() {
    this.appState.isLoading(true)
    this.assessmentService.assess(this.quiz)
      .then((quiz) => this.quizService.update(quiz))
      .then(() => {
        this.router.navigate([''])
      })
      .catch()
      .finally(() => this.appState.isLoading(false))
  }
}

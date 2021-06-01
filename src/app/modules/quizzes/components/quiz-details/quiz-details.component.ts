import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { Question } from 'src/app/models/question'
import { Quiz } from 'src/app/models/quiz'
import { QuestionService } from 'src/app/modules/questions/services/question.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service'
import { SnackbarService } from 'src/app/services/snackbar.service'

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  quiz: Quiz

  constructor(
    private readonly questionService: QuestionService,
    private readonly route: ActivatedRoute,
    private readonly state: AppStateService,
    private readonly snackbar: SnackbarService,
    private readonly confirmationDialog: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      const quiz: Quiz = data.quiz
      quiz.questions = data.questions as Question[]
      this.quiz = quiz
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

  async deleteQuestion(questionId: string, index: number): Promise<void> {
    const isConfirmed = await this.confirmationDialog
      .confirm({ message: 'Are you sure? This action can not be undone.' })
      .toPromise()

    if (isConfirmed) {
      try {
        this.state.isLoading(true)
        await this.questionService.delete(this.quiz.id!, questionId)
        this.quiz.questions?.splice(index, 1)
        this.snackbar.success('Deleted')
      } catch (error) {
        this.snackbar.warn('Uh oh. Something went wrong :/')
        console.error(error.message)
      } finally {
        this.state.isLoading(false)
      }
    }
  }
}

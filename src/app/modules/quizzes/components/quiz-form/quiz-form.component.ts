import { Component, OnDestroy, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AbstractControl, FormArray, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import firebase from 'firebase/app'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { CourseSubject } from 'src/app/models/course-subject'
import { Question } from 'src/app/models/question'
import { Quiz } from 'src/app/models/quiz'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { QuizFormService } from '../../services/quiz-form.service'
import { QuizService } from '../../services/quiz.service'

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
})
export class QuizFormComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  subjects$: Observable<CourseSubject[]>
  form: FormGroup
  quizId: string

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly firestore: AngularFirestore,
    private readonly auth: AuthService,
    private readonly appState: AppStateService,
    private readonly qfs: QuizFormService,
    private readonly quizService: QuizService
  ) {}

  ngOnInit() {
    this.quizId = this.firestore.createId()
    this.subjects$ = this.fetchCourseSubjects()
    this.form = this.qfs.toQuizFormGroup()

    this.subscription = this.route.data.subscribe((data) => {
      if (data.quiz && data.questions) {
        const quiz = data.quiz as Quiz
        this.quizId = quiz.id as string
        quiz.questions = data.questions as Question[]
        this.form = this.qfs.toQuizFormGroup(data.quiz as Quiz)
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get name() {
    return this.form.get('name')!
  }

  get description() {
    return this.form.get('description')!
  }

  get subject() {
    return this.form.get('subject')!
  }

  get visibility() {
    return this.form.get('visibility')!
  }

  get questions() {
    return this.form.get('questions')! as FormArray
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  fetchCourseSubjects() {
    return this.firestore
      .collection<CourseSubject>(Collections.SUBJECTS, (ref) =>
        ref.orderBy('name')
      )
      .valueChanges()
  }

  toFormGroup(control: AbstractControl) {
    return control as FormGroup
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  addQuestion(form?: FormGroup) {
    this.questions.push(form ? form : this.qfs.newQuestionFormGroup())
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index)
  }

  async save() {
    if (this.form.invalid) {
      // this.snackbar.open('Please fill in all required fields');
      console.log('form is invalid')
      return
    }

    const userId = await this.auth.getUserIdAsync()
    if (!userId) {
      this.router.navigate(['/login'])
      return
    }

    this.appState.isLoading(true)

    const questions = this.qfs.toQuestions(this.questions)
    const quiz = new Quiz({
      id: this.quizId,
      name: this.name.value,
      subject: this.subject.value,
      numberOfQuestions: questions.length,
      questions: questions,
      visibility: 'private',
      ownerId: userId,
      editors: [userId],
      description: this.description.value,
      createdOn: firebase.firestore.Timestamp.fromDate(new Date()),
    })

    this.quizService
      .add(quiz)
      .then(() => {
        this.router.navigate(['/quizzes'])
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => this.appState.isLoading(false))
  }
}

import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { CourseSubject } from 'src/app/models/course-subject'
import { Quiz } from 'src/app/models/quiz'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { QuestionControlService } from 'src/app/modules/questions/services/question-control.service'
import firebase from 'firebase/app'
import { QuizService } from '../../services/quiz.service'
import { AppStateService } from 'src/app/services/app-state.service'

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
})
export class QuizFormComponent implements OnInit {
  subjects$: Observable<CourseSubject[]>
  form: FormGroup
  quizId: string

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly qcs: QuestionControlService,
    private readonly afs: AngularFirestore,
    private readonly auth: AuthService,
    private readonly quizService: QuizService,
    private readonly appState: AppStateService
  ) {}

  ngOnInit() {
    this.quizId = this.afs.createId()
    this.subjects$ = this.fetchCourseSubjects()
    this.initForm()
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
    return this.afs
      .collection<CourseSubject>(Collections.SUBJECTS, (ref) =>
        ref.orderBy('name')
      )
      .get()
      .pipe(
        map((actions) =>
          actions.docs.map((doc) => {
            const subject = doc.data() as CourseSubject
            subject.id = doc.id
            return subject
          })
        )
      )
  }

  initForm() {
    this.form = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(2048),
      ]),
      description: this.fb.control('', [Validators.maxLength(4096)]),
      subject: this.fb.control('', [Validators.required]),
      visibility: this.fb.control('public', [Validators.required]),
      questions: this.fb.array([]),
    })
  }

  toFormGroup(control: AbstractControl) {
    return control as FormGroup
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  addQuestion(form?: FormGroup) {
    if (form) {
      this.questions.push(form)
    } else {
      this.questions.push(
        this.qcs.newQuestionFormGroup({ type: 'multiple choice' })
      )
    }
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index)
  }

  async save() {
    if (this.form.invalid) {
      // this.snackbar.open('Please fill in all required fields');
      console.log('form is invalid')
      return;
    }

    const userId = await this.auth.getUserIdAsync()
    if (!userId) {
      this.router.navigate(['/login'])
      return
    }

    this.appState.isLoading(true)
    
    const questions = this.qcs.toQuestions(this.questions)
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
        console.log('A new quiz was created')
        this.router.navigate(['/quizzes'])
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => this.appState.isLoading(false))
  }
}

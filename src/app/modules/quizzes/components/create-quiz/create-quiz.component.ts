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
import { QuestionControlService } from 'src/app/modules/questions/services/question-control.service'

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
  subjects$: Observable<CourseSubject[]>
  form: FormGroup
  quizId: string

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly qcs: QuestionControlService,
    private readonly afs: AngularFirestore
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
    return this.form.get('name')
  }

  get description() {
    return this.form.get('description')
  }

  get subject() {
    return this.form.get('subject')
  }

  get visibility() {
    return this.form.get('visibility')
  }

  get questions() {
    return this.form.get('questions')! as FormArray
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  fetchCourseSubjects() {
    return this.afs
      .collection<CourseSubject>(Collections.SUBJECTS, ref => ref.orderBy('name'))
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

  save() {
    // TODO: Save quiz to database
    console.log(this.qcs.toQuestions(this.questions))
  }
}

import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { FormArray, FormGroup } from '@angular/forms'
import { QuestionOption } from 'src/app/models/question-option'
import { QuizFormService } from '../../quizzes/services/quiz-form.service'

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(
    private readonly firestore: AngularFirestore,
    private readonly qfs: QuizFormService
  ) {}

  updateQuestion(questionId: string, options: QuestionOption[]) {
    // TODO: Update a question while taking an assessment
  }

  toOptionsFormArray(options: QuestionOption[]): FormArray {
    const forms: FormGroup[] = []
    for (let option of options) {
      forms.push(this.qfs.toOptionFormGroup(option))
    }

    return new FormArray(forms)
  }
}

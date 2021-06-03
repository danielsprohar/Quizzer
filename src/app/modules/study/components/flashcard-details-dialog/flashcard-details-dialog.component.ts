import { Component, Inject, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Question, QuestionAttributeConstraints } from 'src/app/models/question'
import { QuestionService } from 'src/app/modules/questions/services/question.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { Flashcard } from '../../models/flashcard'
import firebase from 'firebase/app'

@Component({
  selector: 'app-flashcard-details-dialog',
  templateUrl: './flashcard-details-dialog.component.html',
  styleUrls: ['./flashcard-details-dialog.component.scss'],
})
export class FlashcardDetailsDialogComponent implements OnInit {
  private editMode = false
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<FlashcardDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flashcard,
    private readonly questionService: QuestionService,
    private readonly appState: AppStateService
  ) {}

  ngOnInit(): void {
    if (this.data.questionId) {
      this.editMode = true
    }

    this.form = new FormGroup({
      term: new FormControl(this.data.term || '', [
        Validators.required,
        Validators.maxLength(QuestionAttributeConstraints.TEXT_MAX_LENGTH),
      ]),
      definition: new FormControl(this.data.definition || '', [
        Validators.required,
        Validators.maxLength(
          QuestionAttributeConstraints.EXPLANATION_MAX_LENGTH
        ),
      ]),
    })
  }

  // =========================================================================
  // Getters
  // =========================================================================

  get term(): AbstractControl {
    return this.form.get('term')!
  }

  get definition(): AbstractControl {
    return this.form.get('definition')!
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  private buildQuestionModelFromForm(): Question {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date())
    return new Question({
      text: this.term.value?.trim(),
      explanation: this.definition.value?.trim(),
      createdOn: timestamp,
      modifiedOn: timestamp,
    })
  }

  private buildFlashcardFromQuestion(question: Question): Flashcard {
    return new Flashcard({
      quizId: this.data.quizId,
      questionId: question.id,
      term: question.text,
      definition: question.explanation!,
    })
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  close(): void {
    this.dialogRef.close()
  }

  async save() {
    if (this.form.invalid || this.form.pristine) {
      return
    }

    try {
      this.appState.isLoading(true)
      const question = this.buildQuestionModelFromForm()

      if (this.editMode) {
        question.id = this.data.questionId!
        await this.questionService.update(this.data.quizId!, question)
        const flashcard = this.buildFlashcardFromQuestion(question)
        this.dialogRef.close(flashcard)
      } else {
        const docData = await this.questionService.add(
          this.data.quizId!,
          question
        )
        question.id = docData.id
        const flashcard = this.buildFlashcardFromQuestion(question)
        this.dialogRef.close(flashcard)
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      this.appState.isLoading(false)
    }
  }
}

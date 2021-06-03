import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { QuestionService } from 'src/app/modules/questions/services/question.service'
import { AppStateService } from 'src/app/services/app-state.service'
import { BreakpointService } from 'src/app/services/breakpoint.service'
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { Flashcard } from '../../models/flashcard'
import { FlashcardService } from '../../services/flashcard.service'
import { FlashcardDetailsDialogComponent } from '../flashcard-details-dialog/flashcard-details-dialog.component'

@Component({
  selector: 'app-flashcards-shell',
  templateUrl: './flashcards-shell.component.html',
  styleUrls: ['./flashcards-shell.component.scss'],
})
export class FlashcardsShellComponent implements OnInit, OnDestroy {
  private subSink: Subscription[] = []
  private isHandset = true

  flashcards: Flashcard[]
  currentFlashcard: Flashcard
  currentIndex: number = 0

  @ViewChild('indexInput', { static: true }) indexInput: ElementRef

  constructor(
    private readonly flashcardService: FlashcardService,
    private readonly route: ActivatedRoute,
    private readonly flashcardDetailsDialog: MatDialog,
    private readonly breakpoint: BreakpointService,
    private readonly renderer: Renderer2,
    private readonly questionService: QuestionService,
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly snackbar: SnackbarService,
    private readonly appState: AppStateService
  ) {}

  ngOnInit(): void {
    const quizId = this.route.snapshot.paramMap.get('quizId')!

    this.subSink.push(
      this.route.data.subscribe((data) => {
        this.flashcards = this.flashcardService.generateFlashcards(
          data.questions
        )

        this.flashcards.forEach((flashcard) => (flashcard.quizId = quizId))
        this.currentFlashcard = this.flashcards[0]
      })
    )

    this.subSink.push(
      this.breakpoint.isHandsetAsObservable().subscribe((isHandset) => {
        this.isHandset = isHandset
      })
    )
  }

  ngOnDestroy(): void {
    this.subSink.forEach((sub) => sub.unsubscribe())
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.indexInput.nativeElement, 'value', '1')
    this.renderer.setAttribute(
      this.indexInput.nativeElement,
      'max',
      `${this.flashcards.length}`
    )
    this.renderer.setAttribute(
      this.indexInput.nativeElement,
      'maxlength',
      `${this.flashcards.length.toString().length}`
    )
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  /**
   * Returns true if the given index is *not* within
   * the interval: [0, flashcards.length)
   * @param index
   * @returns
   */
  private isIndexOutOfBounds(index: number): boolean {
    return index < 0 || index >= this.flashcards.length
  }

  handleInputValueChange(value: string): void {
    const index = parseInt(value)
    if (this.isIndexOutOfBounds(index - 1)) {
      this.indexInput.nativeElement.value = this.currentIndex + 1
    } else {
      this.renderFlashcard(index - 1)
    }
  }

  isEnterKey(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter') {
      this.handleInputValueChange(value)
    } else {
      const index = parseInt(value)
      if (this.isIndexOutOfBounds(index - 1)) {
        this.indexInput.nativeElement.value = this.currentIndex + 1
      }
    }
  }

  hasNext(): boolean {
    return this.currentIndex + 1 < this.flashcards.length
  }

  hasPrevious(): boolean {
    return this.currentIndex - 1 >= 0
  }

  private renderFlashcard(index: number): void {
    if (index < 0) {
      index = 0
    } else if (index >= this.flashcards.length) {
      index = this.flashcards.length - 1
    }
    this.currentIndex = index
    this.currentFlashcard = this.flashcards[this.currentIndex]
    this.indexInput.nativeElement.value = this.currentIndex + 1
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  create(): void {
    const ref = this.flashcardDetailsDialog.open(
      FlashcardDetailsDialogComponent,
      {
        data: new Flashcard({
          term: '',
          definition: '',
          quizId: this.currentFlashcard.quizId,
        }),
        panelClass: this.isHandset ? '  full-width' : '',
      }
    )

    this.subSink.push(
      ref.afterClosed().subscribe((flashcard: Flashcard) => {
        if (flashcard) {
          this.flashcards.push(flashcard)
          this.currentIndex = this.flashcards.length - 1
          this.indexInput.nativeElement.value = this.flashcards.length
          this.currentFlashcard = flashcard
        }
      })
    )
  }

  private async deleteFlashcard(flashcard: Flashcard): Promise<void> {
    if (!flashcard.quizId) {
      throw new Error('Quiz ID is not defined.')
    }
    if (!flashcard.questionId) {
      throw new Error('Question ID is not defined.')
    }
    try {
      this.appState.isLoading(true)
      await this.questionService.delete(flashcard.quizId, flashcard.questionId)
      this.flashcards.splice(this.currentIndex, 1)
      this.currentIndex = this.currentIndex - 1
      this.renderFlashcard(this.currentIndex)
    } catch (error) {
      console.error(error.message)
      this.snackbar.warn('Operation failed 😑 Please try again')
    } finally {
      this.appState.isLoading(false)
    }
  }

  delete(): void {
    const ref = this.confirmationDialog.confirm({
      title: 'Delete flashcard?',
      message: 'Are you sure?',
    })

    const sub = ref.subscribe(async (isConfirmed: boolean) => {
      if (isConfirmed) {
        await this.deleteFlashcard(this.flashcards[this.currentIndex])
      }
    })

    this.subSink.push(sub)
  }

  edit(): void {
    const ref = this.flashcardDetailsDialog.open(
      FlashcardDetailsDialogComponent,
      {
        data: this.currentFlashcard,
        panelClass: this.isHandset ? 'full-width' : '',
      }
    )

    this.subSink.push(
      ref.afterClosed().subscribe((result) => {
        if (result) {
          this.currentFlashcard = result
        }
      })
    )
  }

  next(): void {
    if (!this.hasNext()) {
      return
    }
    this.renderFlashcard(this.currentIndex + 1)
  }

  previous(): void {
    if (!this.hasPrevious()) {
      return
    }
    this.renderFlashcard(this.currentIndex - 1)
  }
}

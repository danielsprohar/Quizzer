import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { Flashcard } from '../../models/flashcard'
import { FlashcardService } from '../../services/flashcard.service'

@Component({
  selector: 'app-flashcards-shell',
  templateUrl: './flashcards-shell.component.html',
  styleUrls: ['./flashcards-shell.component.scss'],
})
export class FlashcardsShellComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription
  flashcards: Flashcard[]
  currentFlashcard: Flashcard
  currentIndex: number = 0

  constructor(
    private readonly flashcardService: FlashcardService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.flashcards = this.flashcardService.generateFlashcards(data.questions)
      this.currentFlashcard = this.flashcards[0]
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  hasNext(): boolean {
    return this.currentIndex + 1 < this.flashcards.length
  }

  hasPrevious(): boolean {
    return this.currentIndex - 1 >= 0
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  next(): void {
    if (!this.hasNext()) {
      return
    }

    this.currentFlashcard = this.flashcards[++this.currentIndex]
  }

  previous(): void {
    if (!this.hasPrevious()) {
      return
    }
    this.currentFlashcard = this.flashcards[--this.currentIndex]
  }
}

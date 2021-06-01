import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { SnackbarService } from 'src/app/services/snackbar.service'
import { CardData } from './models/card-data'
import { MatchGameService } from './services/match-game.service'

@Component({
  selector: 'app-match-game',
  templateUrl: './match-game.component.html',
  styleUrls: ['./match-game.component.scss'],
})
export class MatchGameComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  cardsData: CardData[]

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: MatchGameService,
    private readonly snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      this.cardsData = this.gameService.generateGameData(data.questions)
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  // =========================================================================
  // Facilitators
  // =========================================================================

  private isGameOver() {
    const cards = document.getElementsByClassName('card')
    const length = cards.length
    let isGameOver = true

    for (let i = 0; i < length; i++) {
      if (!cards.item(i)?.classList.contains('hidden-card')) {
        isGameOver = false
        break
      }
    }

    return isGameOver
  }

  private removeCards(cards: CardData[]) {
    cards.forEach((card) => {
      const el = document.getElementById(card.getID())
      el?.classList.toggle('hidden-card')
    })

    this.gameService.clearCards()
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  selectCard(card: CardData): void {
    const newLength = this.gameService.addCard(card)
    if (newLength < 2) {
      const el = document.getElementById(card.getID())
      el?.classList.toggle('mat-elevation-z10')
      el?.classList.toggle('is-selected')
    } else if (newLength >= 2) {
      this.gameService.getCards().forEach((card) => {
        const el = document.getElementById(card.getID())
        el?.classList.remove('mat-elevation-z10')
        el?.classList.remove('is-selected')
      })

      this.gameService.clearCards()
    } else if (this.gameService.isCorrectCardSelection()) {
      this.removeCards(this.gameService.getCards())
      if (this.isGameOver()) {
        this.snackbar.success('Excellent!')
        // Display the dialog service
      }
    }
  }
}

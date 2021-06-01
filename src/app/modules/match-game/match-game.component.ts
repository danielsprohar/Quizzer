import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service'
import { CardData } from './models/card-data'
import { MatchGameService } from './services/match-game.service'

@Component({
  selector: 'app-match-game',
  templateUrl: './match-game.component.html',
  styleUrls: ['./match-game.component.scss'],
})
export class MatchGameComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription
  private dialogSubscription: Subscription
  cardsData: CardData[]

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: MatchGameService,
    private readonly router: Router,
    private readonly dialog: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.cardsData = this.gameService.generateGameData(data.questions)
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe()
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

  private resetGame(): void {
    this.cardsData = this.gameService.shuffleCards(this.cardsData)
    const cards = document.getElementsByClassName('card')
    const length = cards.length
    for (let i = 0; i < length; i++) {
      cards.item(i)?.classList.remove('hidden-card')
      cards.item(i)?.classList.remove('is-selected')
      cards.item(i)?.classList.remove('mat-elevation-z10')
    }
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================

  private async delay(milliseconds: number) {
    return new Promise((res) => setTimeout(res, milliseconds))
  }

  private handleGameOver(): void {
    this.delay(3000).then(() => {
      this.dialogSubscription = this.dialog
        .confirm({
          title: 'Excellent',
          message: 'Want to play again?',
        })
        .subscribe((anotherRound) => {
          if (anotherRound) {
            this.resetGame()
          } else {
            const quizId = this.route.snapshot.paramMap.get('quizId')
            this.router.navigate(['/quizzes', quizId, 'details'])
          }
        })
    })
  }

  selectCard(card: CardData): void {
    const newLength = this.gameService.addCard(card)
    if (newLength < 2) {
      const el = document.getElementById(card.getID())
      el?.classList.toggle('mat-elevation-z10')
      el?.classList.toggle('is-selected')
    } else if (this.gameService.isCorrectCardSelection()) {
      this.removeCards(this.gameService.getCards())
      if (this.isGameOver()) {
        this.handleGameOver()
      }
    } else {
      this.gameService.getCards().forEach((card) => {
        const el = document.getElementById(card.getID())
        el?.classList.remove('mat-elevation-z10')
        el?.classList.remove('is-selected')
      })

      this.gameService.clearCards()
    }
  }
}

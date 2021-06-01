import { Location } from '@angular/common'
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service'
import { CardData } from '../../models/card-data'
import { MatchGameService } from '../../services/match-game.service'
import { StopWatchComponent } from '../stop-watch/stop-watch.component'

@Component({
  selector: 'app-match-game',
  templateUrl: './match-game.component.html',
  styleUrls: ['./match-game.component.scss'],
})
export class MatchGameComponent implements OnInit, OnDestroy, AfterViewInit {
  private routeSubscription: Subscription
  private initialDialogSubsription: Subscription
  private dialogSubscription: Subscription
  private quizId: string

  @ViewChild(StopWatchComponent) timer: StopWatchComponent
  cardsData: CardData[]

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameService: MatchGameService,
    private readonly router: Router,
    private readonly dialog: ConfirmationDialogService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizId')!
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.cardsData = this.gameService.generateGameData(data.questions)
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe()
    }
    if (this.initialDialogSubsription) {
      this.initialDialogSubsription.unsubscribe()
    }
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe()
    }
    this.timer.stop()
  }

  ngAfterViewInit(): void {
    this.initialDialogSubsription = this.dialog
      .confirm({
        title: 'Matching Game',
        message: 'Match the correct terms to complete the game. Ready to play?',
      })
      .subscribe((result) => {
        if (result) {
          this.timer.start()
        } else {
          this.location.back()
        }
      })
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

    this.timer.reset()
    this.timer.start()
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
            this.router.navigate(['/quizzes', this.quizId, 'details'])
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
        this.timer.stop()
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

  quit(): void {
    this.timer.stop()
    this.router.navigate(['/quizzes', this.quizId, 'details'])
  }

  pause(): void {
    this.timer.stop()
  }
}

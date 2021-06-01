import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
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
    private readonly matchGameService: MatchGameService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe((data) => {
      this.cardsData = this.matchGameService.generateGameData(data.questions)
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getCardId(card: CardData) {}

  selectCard(card: CardData): void {
    console.log(card)
  }
}

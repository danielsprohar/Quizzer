import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { Flashcard } from '../../models/flashcard'

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {
  @ViewChild('flipCard') flipCard: ElementRef
  @Input() flashcard: Flashcard

  constructor() {}

  ngOnInit(): void {}

  flip(): void {
    this.flipCard.nativeElement.classList.toggle('rotate-y')
  }
}

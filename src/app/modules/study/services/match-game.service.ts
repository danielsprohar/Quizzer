import { Injectable } from '@angular/core'
import { isMultipleChoiceQuestion, Question } from 'src/app/models/question'
import { CardData } from '../models/card-data'

@Injectable({
  providedIn: 'root',
})
export class MatchGameService {
  private readonly userCards: CardData[] = []

  constructor() {}

  // =========================================================================
  // Game facilitators
  // =========================================================================

  /**
   * Appends a new card to the end of the underlying array, 
   * and returns the new length of the array.
   * @param card The user selected card.
   * @returns The new length of the array.
   */
  addCard(card: CardData): number {
    return this.userCards.push(card)
  }

  clearCards(): void {
    while (this.userCards.length > 0) {
      this.userCards.pop()
    }
  }

  private checkCards(cardOne: CardData, cardTwo: CardData): boolean {
    return cardOne.index == cardTwo.index && cardOne.type !== cardTwo.type
  }

  isCorrectCardSelection() {
    if (this.userCards.length != 2) {
      return false
    }
    return this.checkCards(this.userCards[0], this.userCards[1])
  }

  getCards(): CardData[] {
    return this.userCards
  }

  getCardCount(): number {
    return this.userCards.length
  }

  // =========================================================================
  // Generators
  // =========================================================================

  private generateWrittenResponseCardData(
    question: Question,
    index: number
  ): CardData[] {
    const answerTextCard = new CardData({
      index,
      type: 'a',
      text: question.explanation!,
    })
    const questionTextCard = new CardData({
      index,
      type: 'q',
      text: question.text,
    })
    return Array.of(answerTextCard, questionTextCard)
  }

  private generateMultipleChoiceCardData(
    question: Question,
    index: number
  ): CardData[] {
    const answers = question.options
      ?.filter((option) => option.isAnswer)
      .map((correctOption) => correctOption.text)

    if (!Array.isArray(answers)) {
      throw new Error('A question must have an answer to create a new mapping')
    }

    const max = answers.length
    const randomIndex = Math.floor(Math.random() * max)
    const optionText = answers[randomIndex]

    const answerTextCard = new CardData({ index, type: 'a', text: optionText })
    const questionTextCard = new CardData({
      index,
      type: 'q',
      text: question.text,
    })

    return Array.of(answerTextCard, questionTextCard)
  }

  generateGameData(questions: Question[]): CardData[] {
    if (!questions) {
      throw new Error(
        '[MatcherService::generateMappings]: questions are undefined'
      )
    }

    const cards: CardData[] = []

    questions.forEach((question, index) => {
      const [answerCard, questionCard] = isMultipleChoiceQuestion(question.type)
        ? this.generateMultipleChoiceCardData(question, index)
        : this.generateWrittenResponseCardData(question, index)

      cards.push(answerCard, questionCard)
    })

    return this.shuffleCards(cards)
  }

  // =========================================================================
  // Dealer (the house always wins)
  // =========================================================================

  /**
   * Shuffle the cards in place using the Fisher-Yates algorithm.
   * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
   * @param cards
   */
  shuffleCards(cards: CardData[]) {
    for (let i = cards.length - 1; i > 0; i--) {
      // j = random integer such that 0 ≤ j ≤ i
      const j = Math.floor(Math.random() * (i + 1))
      const temp = cards[i]
      cards[i] = cards[j]
      cards[j] = temp
    }

    return cards
  }
}

import { Injectable } from '@angular/core'
import { isMultipleChoiceQuestion, Question } from 'src/app/models/question'
import { CardData } from '../models/card-data'

@Injectable({
  providedIn: 'root',
})
export class MatchGameService {
  constructor() {}

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

  /**
   * Shuffle the cards in place using the Fisher-Yates algorithm.
   * @see https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
   * @param cards
   */
  private shuffleCards(cards: CardData[]) {
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

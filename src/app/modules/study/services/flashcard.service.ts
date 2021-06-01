import { Injectable } from '@angular/core'
import { isMultipleChoiceQuestion, Question } from 'src/app/models/question'
import { Flashcard } from '../models/flashcard'

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  constructor() {}

  private flashcardFromMultipleChoice(question: Question): Flashcard {
    const answers = question.options
      ?.filter((option) => option.isAnswer)
      .map((correctOption) => correctOption.text)

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
    if (!Array.isArray(answers)) {
      throw new Error('A question must have an answer to create a new mapping')
    }

    const max = answers.length
    const randomIndex = Math.floor(Math.random() * max)
    const optionText = answers[randomIndex]

    return new Flashcard(question.text, optionText)
  }

  generateFlashcards(questions: Question[]): Flashcard[] {
    return questions.map((question) => {
      if (isMultipleChoiceQuestion(question.type)) {
        return this.flashcardFromMultipleChoice(question)
      }
      return new Flashcard(question.text, question.explanation!)
    })
  }
}

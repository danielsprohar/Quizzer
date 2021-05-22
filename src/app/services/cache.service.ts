import { Injectable } from '@angular/core'
import { Question } from '../models/question'
import { Quiz } from '../models/quiz'

enum CacheKeys {
  QUIZ = 'quiz',
  QUESTION = 'question',
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  setQuiz(quiz: Quiz) {
    localStorage.setItem(CacheKeys.QUIZ, JSON.stringify(quiz))
  }

  setQuestion(question: Question) {
    localStorage.setItem(CacheKeys.QUESTION, JSON.stringify(question))
  }

  getQuiz() {
    const value = localStorage.getItem(CacheKeys.QUIZ)
    return value ? JSON.parse(value) : null
  }

  getQuestion() {
    const value = localStorage.getItem('question')
    return value ? JSON.parse(value) : null
  }
}

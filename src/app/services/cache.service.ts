import { Injectable } from '@angular/core'
import { Question } from '../models/question'
import { Quiz } from '../models/quiz'
import { Assessment } from '../modules/assessments/models/assessment'

enum CacheKeys {
  ASSESSMENT = 'assessment',
  QUIZ = 'quiz',
  QUESTION = 'question',
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  setAssessment(assessment: Assessment | null) {
    if (!assessment) {
      localStorage.removeItem(CacheKeys.ASSESSMENT)
    } else {
      localStorage.setItem(CacheKeys.ASSESSMENT, JSON.stringify(assessment))
    }
  }

  setQuiz(quiz: Quiz | null) {
    if (!quiz) {
      localStorage.removeItem(CacheKeys.QUIZ)
    } else {
      localStorage.setItem(CacheKeys.QUIZ, JSON.stringify(quiz))
    }
  }

  setQuestion(question: Question) {
    if (!question) {
      localStorage.removeItem(CacheKeys.QUESTION)
    } else {
      localStorage.setItem(CacheKeys.QUESTION, JSON.stringify(question))
    }
  }

  getAssessment() {
    const value = localStorage.getItem(CacheKeys.ASSESSMENT)
    return value ? (JSON.parse(value) as Assessment) : null
  }

  getQuiz() {
    const value = localStorage.getItem(CacheKeys.QUIZ)
    return value ? (JSON.parse(value) as Quiz) : null
  }

  getQuestion() {
    const value = localStorage.getItem(CacheKeys.QUESTION)
    return value ? JSON.parse(value) : null
  }
}

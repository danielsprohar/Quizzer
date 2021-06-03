import { Injectable } from '@angular/core'
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore'
import { Collections } from 'src/app/constants/collections'
import { Question } from 'src/app/models/question'
import firebase from 'firebase/app'

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private readonly firestore: AngularFirestore) {}

  add(
    quizId: string,
    question: Question
  ): Promise<DocumentReference<firebase.firestore.DocumentData>> {
    return this.firestore
      .collection(Collections.QUIZZES)
      .doc(quizId)
      .collection(Collections.QUIZ_QUESTIONS)
      .add(JSON.parse(JSON.stringify(question)))
  }

  delete(quizId: string, questionId: string): Promise<void> {
    return this.firestore
      .collection(Collections.QUIZZES)
      .doc(quizId)
      .collection(Collections.QUIZ_QUESTIONS)
      .doc(questionId)
      .delete()
  }

  update(quizId: string, question: Question): Promise<void> {
    question.modifiedOn = firebase.firestore.Timestamp.now()
    return this.firestore
      .collection(Collections.QUIZZES)
      .doc(quizId)
      .collection(Collections.QUIZ_QUESTIONS)
      .doc(question.id)
      .update(JSON.parse(JSON.stringify(question)))
  }
}

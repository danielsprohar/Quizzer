import { Injectable } from '@angular/core'
import { AngularFirestore, QueryFn } from '@angular/fire/firestore'
import { map } from 'rxjs/operators'
import { Collections } from 'src/app/constants/collections'
import { Question } from 'src/app/models/question'
import { Quiz } from 'src/app/models/quiz'
import firebase from 'firebase/app'
import { QuestionOption } from 'src/app/models/question-option'

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private readonly afs: AngularFirestore) {}

  /**
   * Adds a new quiz to the database via transaction
   * @param quiz The quiz to add.
   * @returns A `DocumentReference` of the newly added `Quiz`.
   */
  add(quiz: Quiz) {
    const quizRef = this.afs
      .collection(Collections.QUIZZES)
      .doc<Quiz>(quiz.id).ref

    const batch = this.afs.firestore.batch()
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date())
    batch.set(quizRef, {
      name: quiz.name,
      subject: quiz.subject,
      description: quiz.description,
      numberOfQuestions: quiz.numberOfQuestions,
      ownerId: quiz.ownerId,
      editors: quiz.editors,
      visibility: quiz.visibility,
      createdOn: timestamp,
      modifiedOn: timestamp,
    })

    // Add each question as a document to the subcollection
    const questionsRef = quizRef.collection(Collections.QUIZ_QUESTIONS)
    quiz.questions?.forEach((question) => {
      const questionRef = questionsRef.doc()
      batch.set(questionRef, JSON.parse(JSON.stringify(question)))
    })

    return batch.commit()
  }

  /**
   * Deletes a `Quiz` from the database.
   * @param quiz The `Quiz` model.
   * @returns A `Promise` after the database operation is complete.
   */
  delete(quiz: Quiz) {
    // TODO: Delete quiz
    throw new Error()
  }

  /**
   * Fetches a `Quiz` from the database
   * @param quizId The quiz id in the database.
   * @returns The quiz.
   */
  get(quizId: string) {
    return this.afs
      .collection(Collections.QUIZZES)
      .doc<Quiz>(quizId)
      .get()
      .pipe(map((doc) => doc.data() as Quiz))
  }

  getAll(queryFn: QueryFn<firebase.firestore.DocumentData> | undefined) {
    return this.afs
      .collection<Quiz>(Collections.QUIZZES, queryFn)
      .get()
      .pipe(
        map((values) =>
          values.docs.map((doc) => {
            const quiz = doc.data() as Quiz
            quiz.id = doc.id
            return quiz
          })
        )
      )
  }

  /**
   * Fetchs all the questions that are associated with the given quiz id.
   * @param quizId The quiz id in the database.
   * @returns The quiz's questions.
   */
  getQuestions(quizId: string) {
    return this.afs
      .collection(Collections.QUIZZES)
      .doc(quizId)
      .collection(Collections.QUIZ_QUESTIONS)
      .get()
      .pipe(
        map((snapshot) =>
          snapshot.docs.map((doc) => {
            const question = doc.data() as Question
            question.id = doc.id
            return question
          })
        )
      )
    // .stateChanges()
    // .pipe(
    //   map((actions) =>
    //     actions.map((action) => {
    //       const question = action.payload.doc.data() as Question
    //       question.id = action.payload.doc.id
    //       console.log(question)
    //       return question
    //     })
    //   )
    // )
  }

  // =========================================================================
  // Update
  // =========================================================================

  toUpdateOptionModels(options: QuestionOption[]) {
    const models: any[] = []
    for (let option of options) {
      models.push({
        text: option.text,
        isAnswer: option.isAnswer,
        isSelected: option.isSelected,
      })
    }

    return models
  }

  // =========================================================================

  private toUpdateQuestionModel(question: Question): any {
    const model: any = {
      text: question.text,
      type: question.type,
      hint: question.hint,
      explanation: question.explanation,
      isAttempted: question.isAttempted || false,
      isCorrect: question.isCorrect || null,
      imageURL: question.imageURL,
      imageCaption: question.imageCaption,
      modifiedOn: firebase.firestore.Timestamp.fromDate(new Date()),
    }

    if (question.options && question.options.length > 0) {
      model['options'] = firebase.firestore.FieldValue.arrayUnion(
        ...this.toUpdateOptionModels(question.options)
      )
    }

    return model
  }

  // =========================================================================

  toUpdateQuizModel(quiz: Quiz): any {
    return {
      name: quiz.name,
      subject: quiz.subject,
      description: quiz.description,
      numberOfQuestions: quiz.numberOfQuestions,
      ownerId: quiz.ownerId,
      editors: quiz.editors,
      visibility: quiz.visibility,
      modifiedOn: firebase.firestore.Timestamp.fromDate(new Date()),
    }
  }

  /**
   * Updates a `Quiz` in the database.
   * @param quiz The quiz.
   * @returns A `Promise` after the database operation completes.
   */
  update(quiz: Quiz) {
    const quizDoc = this.afs.collection(Collections.QUIZZES).doc(quiz.id)
    const batch = this.afs.firestore.batch()
    batch.update(quizDoc.ref, this.toUpdateQuizModel(quiz))

    // Update each question
    if (quiz.questions) {
      for (let question of quiz.questions) {
        const questionDoc = quizDoc
          .collection(Collections.QUIZ_QUESTIONS)
          .doc(question.id ? question.id : undefined)

        batch.set(questionDoc.ref, this.toUpdateQuestionModel(question), {
          merge: true,
        })
      }
    }

    return batch.commit()
  }
}

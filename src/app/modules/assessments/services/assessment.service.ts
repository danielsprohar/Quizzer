import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QuestionOption } from 'src/app/models/question-option';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private readonly firestore: AngularFirestore) { }

  updateQuestion(questionId: string, options: QuestionOption[]) {
    // TODO: Update a question while taking an assessment
  }
}

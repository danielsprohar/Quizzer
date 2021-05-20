import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs'
import { Quiz } from 'src/app/models/quiz'
import { QuizService } from './services/quiz.service'

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  quizzes$: Observable<Quiz[]>

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly quizService: QuizService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.afAuth.currentUser
    this.quizzes$ = this.quizService.getAll((ref) =>
      ref.where('ownerId', '==', user?.uid)
    )
  }
}

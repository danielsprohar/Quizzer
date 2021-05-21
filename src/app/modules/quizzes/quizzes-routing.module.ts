import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuestionsResolver } from '../questions/resolvers/questions.resolver'
import { QuizFormComponent } from './components/quiz-form/quiz-form.component'
import { QuizzesComponent } from './quizzes.component'
import { QuizResolver } from './resolvers/quiz.resolver'

const routes: Routes = [
  {
    path: '',
    component: QuizzesComponent,
  },
  {
    path: 'create',
    component: QuizFormComponent,
  },
  {
    path: ':id/edit',
    component: QuizFormComponent,
    resolve: {
      quiz: QuizResolver,
      questions: QuestionsResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}

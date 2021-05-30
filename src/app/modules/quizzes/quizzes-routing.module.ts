import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { EditQuestionComponent } from '../questions/components/edit-question/edit-question.component'
import { QuestionFormComponent } from '../questions/components/question-form/question-form.component'
import { QuestionDetailsResolver } from '../questions/resolvers/question-details.resolver'
import { QuestionsResolver } from '../questions/resolvers/questions.resolver'
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component'
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
    path: ':quizId/details',
    component: QuizDetailsComponent,
    resolve: {
      quiz: QuizResolver,
      questions: QuestionsResolver,
    },
  },
  {
    path: ':quizId/edit',
    component: QuizFormComponent,
    resolve: {
      quiz: QuizResolver,
      questions: QuestionsResolver,
    },
  },
  {
    path: ':quizId/questions/:questionId/edit',
    component: EditQuestionComponent,
    resolve: {
      question: QuestionDetailsResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}

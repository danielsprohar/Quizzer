import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuizzesRoutingModule } from './quizzes-routing.module'
import { QuizzesComponent } from './quizzes.component'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { ReactiveFormsModule } from '@angular/forms'
import { QuizFormComponent } from './components/quiz-form/quiz-form.component'
import { QuestionsModule } from '../questions/questions.module'
import { QuizDetailsComponent } from './components/quiz-details/quiz-details.component'
import { QuizGridViewComponent } from './components/quiz-grid-view/quiz-grid-view.component'
import { QuizShellComponent } from './components/quiz-shell/quiz-shell.component'

@NgModule({
  declarations: [
    QuizzesComponent,
    QuizShellComponent,
    QuizFormComponent,
    QuizDetailsComponent,
    QuizGridViewComponent,
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    QuestionsModule,
  ],
})
export class QuizzesModule {}

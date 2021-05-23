import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AssessmentsRoutingModule } from './assessments-routing.module'
import { AssessmentsComponent } from './assessments.component'
import { QuizComponent } from './components/quiz/quiz.component'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { QuestionComponent } from './components/question/question.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentSummaryComponent } from './components/assessment-summary/assessment-summary.component'

@NgModule({
  declarations: [
    AssessmentsComponent,
    QuizComponent,
    QuestionComponent,
    AssessmentSummaryComponent,
  ],
  imports: [
    CommonModule,
    AssessmentsRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,
  ],
})
export class AssessmentsModule {}

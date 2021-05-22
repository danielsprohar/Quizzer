import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AssessmentsRoutingModule } from './assessments-routing.module'
import { AssessmentsComponent } from './assessments.component'
import { QuizComponent } from './components/quiz/quiz.component'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'

@NgModule({
  declarations: [AssessmentsComponent, QuizComponent],
  imports: [CommonModule, AssessmentsRoutingModule, MaterialDesignModule],
})
export class AssessmentsModule {}

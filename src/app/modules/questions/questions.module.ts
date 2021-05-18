import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { QuestionFormComponent } from './components/question-form/question-form.component'
import { QuestionControlService } from './services/question-control.service'

@NgModule({
  declarations: [QuestionFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialDesignModule],
  exports: [QuestionFormComponent],
  providers: [QuestionControlService]
})
export class QuestionsModule {}

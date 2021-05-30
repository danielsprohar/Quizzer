import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { QuestionFormComponent } from './components/question-form/question-form.component'
import { EditQuestionComponent } from './components/edit-question/edit-question.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [QuestionFormComponent, EditQuestionComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialDesignModule,
  ],
  exports: [QuestionFormComponent],
  providers: [],
})
export class QuestionsModule {}

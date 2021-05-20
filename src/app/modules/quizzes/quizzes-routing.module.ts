import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizzesComponent } from './quizzes.component';

const routes: Routes = [
  { 
    path: '', 
    component: QuizzesComponent 
  },
  {
    path: 'create',
    component: QuizFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }

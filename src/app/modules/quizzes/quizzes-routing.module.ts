import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { QuizzesComponent } from './quizzes.component';

const routes: Routes = [
  { 
    path: '', 
    component: QuizzesComponent 
  },
  {
    path: 'create',
    component: CreateQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }

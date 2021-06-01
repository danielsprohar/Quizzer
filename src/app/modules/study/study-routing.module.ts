import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuestionsResolver } from '../questions/resolvers/questions.resolver'
import { MatchGameComponent } from './components/match-game/match-game.component'
import { StudyComponent } from './study.component'

const routes: Routes = [
  {
    path: '',
    component: StudyComponent,
  },
  {
    path: ':quizId/match',
    component: MatchGameComponent,
    resolve: {
      questions: QuestionsResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyRoutingModule {}
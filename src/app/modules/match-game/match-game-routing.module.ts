import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuestionsResolver } from '../questions/resolvers/questions.resolver'
import { MatchGameComponent } from './match-game.component'

const routes: Routes = [
  { 
    path: '', 
    component: MatchGameComponent,
    resolve: {
      questions: QuestionsResolver
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchGameRoutingModule {}

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuestionsResolver } from '../questions/resolvers/questions.resolver'
import { FlashcardDetailsDialogComponent } from './components/flashcard-details-dialog/flashcard-details-dialog.component'
import { FlashcardsShellComponent } from './components/flashcards-shell/flashcards-shell.component'
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
  {
    path: ':quizId/flashcards',
    component: FlashcardsShellComponent,
    resolve: {
      questions: QuestionsResolver,
    },
  },
  {
    path: ':quizId/flashcards/:flashcardId/edit',
    component: FlashcardDetailsDialogComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyRoutingModule {}

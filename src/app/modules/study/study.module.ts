import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StudyRoutingModule } from './study-routing.module'
import { StudyComponent } from './study.component'
import { MatchGameComponent } from './components/match-game/match-game.component'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { StopWatchComponent } from './components/stop-watch/stop-watch.component'
import { FlashcardsShellComponent } from './components/flashcards-shell/flashcards-shell.component'
import { FlashcardComponent } from './components/flashcard/flashcard.component'
import { FlashcardDetailsDialogComponent } from './components/flashcard-details-dialog/flashcard-details-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    StudyComponent,
    MatchGameComponent,
    StopWatchComponent,
    FlashcardsShellComponent,
    FlashcardComponent,
    FlashcardDetailsDialogComponent,
  ],
  imports: [
    CommonModule,
    StudyRoutingModule,
    MaterialDesignModule,
    ReactiveFormsModule,
  ],
})
export class StudyModule {}

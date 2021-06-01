import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'
import { StopWatchComponent } from './components/stop-watch/stop-watch.component'
import { MatchGameRoutingModule } from './match-game-routing.module'
import { MatchGameComponent } from './match-game.component'

@NgModule({
  declarations: [MatchGameComponent, StopWatchComponent],
  imports: [CommonModule, MatchGameRoutingModule, MaterialDesignModule],
})
export class MatchGameModule {}

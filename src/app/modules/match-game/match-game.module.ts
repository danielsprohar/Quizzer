import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatchGameRoutingModule } from './match-game-routing.module'
import { MatchGameComponent } from './match-game.component'
import { MaterialDesignModule } from 'src/app/theme/material-design/material-design.module'

@NgModule({
  declarations: [MatchGameComponent],
  imports: [CommonModule, MatchGameRoutingModule, MaterialDesignModule],
})
export class MatchGameModule {}

import { Component, OnInit } from '@angular/core';
import { AppThemeService } from 'src/app/services/app-theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(public readonly appTheme: AppThemeService) {}

  ngOnInit(): void {}

  // =========================================================================
  // Event handlers
  // =========================================================================

  /**
   * Toggles the application's color theme.
   */
  public toggleAppTheme(): void {
    this.appTheme.setIsDarkTheme(!this.appTheme.getIsDarkTheme());
  }
}

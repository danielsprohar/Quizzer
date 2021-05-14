import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './modules/auth/services/auth.service';
import { AppStateService } from './services/app-state.service';
import { AppThemeService } from './services/app-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private isDarkThemeSubscription?: Subscription;
  private isHandsetSubscription?: Subscription;

  isDarkTheme: boolean = false;
  isHandset: boolean = false;

  constructor(
    public authService: AuthService,
    private readonly afAuth: AngularFireAuth,
    private readonly overlayContainer: OverlayContainer,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    public readonly theme: AppThemeService,
    public readonly appState: AppStateService
  ) {}

  // =========================================================================
  // Lifecycle hooks
  // =========================================================================

  ngOnInit() {
    this.isHandsetSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      )
      .subscribe((isHandset) => (this.isHandset = isHandset));

    this.isDarkThemeSubscription = this.theme
      .isDarkThemeAsObservable()
      .subscribe((isDarkTheme) => {
        if (isDarkTheme) {
          // reference: https://material.angular.io/guide/theming#multiple-themes
          this.overlayContainer
            .getContainerElement()
            .classList.add('dark-theme');
          this.isDarkTheme = true;
        } else {
          this.overlayContainer
            .getContainerElement()
            .classList.remove('dark-theme');
          this.isDarkTheme = false;
        }
      });
  }

  // =========================================================================

  ngOnDestroy(): void {
    if (this.isDarkThemeSubscription) {
      this.isDarkThemeSubscription.unsubscribe();
    }
    if (this.isHandsetSubscription) {
      this.isHandsetSubscription.unsubscribe();
    }
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  public signOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}

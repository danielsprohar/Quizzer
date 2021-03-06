import { BreakpointObserver } from '@angular/cdk/layout'
import { OverlayContainer } from '@angular/cdk/overlay'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router'
import { Subscription } from 'rxjs'
import { AppStateService } from './services/app-state.service'
import { AppThemeService } from './services/app-theme.service'
import { BreakpointService } from './services/breakpoint.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private isDarkThemeSubscription: Subscription
  private isHandsetSubscription: Subscription
  private routerEventsSubscription: Subscription

  isDarkTheme: boolean = false
  isHandset: boolean = false

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly overlayContainer: OverlayContainer,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly theme: AppThemeService,
    private readonly breakpoint: BreakpointService,
    public readonly appState: AppStateService
  ) {}

  // =========================================================================
  // Lifecycle hooks
  // =========================================================================

  ngOnInit() {
    this.initAppThemeObserver()
    this.initBreakpointObserver()
    this.initProgressBarObserver()
  }

  // =========================================================================

  ngOnDestroy(): void {
    if (this.isDarkThemeSubscription) {
      this.isDarkThemeSubscription.unsubscribe()
    }
    if (this.isHandsetSubscription) {
      this.isHandsetSubscription.unsubscribe()
    }
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe()
    }
    localStorage.clear()
  }

  // =========================================================================
  // Observers
  // =========================================================================

  initBreakpointObserver(): void {
    this.isHandsetSubscription = this.breakpoint
      .isHandsetAsObservable()
      .subscribe((isHandset) => (this.isHandset = isHandset))
  }

  // =========================================================================

  initProgressBarObserver(): void {
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart:
          this.appState.isLoading(true)
          break
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          this.appState.isLoading(false)
          break

        default:
          break
      }
    })
  }

  // =========================================================================

  initAppThemeObserver(): void {
    this.isDarkThemeSubscription = this.theme
      .isDarkThemeAsObservable()
      .subscribe((isDarkTheme) => {
        if (isDarkTheme) {
          // reference: https://material.angular.io/guide/theming#multiple-themes
          this.overlayContainer
            .getContainerElement()
            .classList.add('dark-theme')
          this.isDarkTheme = true
        } else {
          this.overlayContainer
            .getContainerElement()
            .classList.remove('dark-theme')
          this.isDarkTheme = false
        }
      })
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  signOut(): void {
    this.afAuth.signOut()
    this.router.navigate(['/'])
  }
}

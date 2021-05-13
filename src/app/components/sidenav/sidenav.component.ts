import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AppThemeService } from 'src/app/services/app-theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  isUserSignedIn: boolean = false;

  constructor(
    private readonly afAuth: AngularFireAuth,
    public readonly authService: AuthService,
    public readonly appTheme: AppThemeService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user) => {
      this.isUserSignedIn = user ? true : false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  toggleAppTheme(): void {
    this.appTheme.setIsDarkTheme(!this.appTheme.getIsDarkTheme());
  }

  signOut(): void {
    this.afAuth.signOut();
  }

}

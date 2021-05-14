import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
    private readonly router: Router,
    public readonly authService: AuthService,
    public readonly theme: AppThemeService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.isUserSignedIn().subscribe((value) => {
      this.isUserSignedIn = value;
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
    this.theme.isDarkTheme(!this.theme.getIsDarkTheme());
  }

  signOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}

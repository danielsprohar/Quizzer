import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AppThemeService } from 'src/app/services/app-theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  user$: Observable<firebase.User | null>;
  isDarkTheme$: Observable<boolean>

  constructor(
    private readonly router: Router,
    private readonly theme: AppThemeService,
    public readonly auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.getCurrentUser();
    this.isDarkTheme$ = this.theme.isDarkThemeAsObservable()
  }

  // =========================================================================
  // Event handlers
  // =========================================================================

  toggleAppTheme(): void {
    this.theme.isDarkTheme(!this.theme.getIsDarkTheme());
  }

  signOut(): void {
    this.auth.signOut();
    this.router.navigate(['/']);
  }
}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit, OnDestroy {
  private isHandsetSubscription?: Subscription;

  @Input() drawer: MatSidenav;
  isHandset: boolean = false;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    public readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isHandsetSubscription = this.breakpointObserver
      .observe(Breakpoints.HandsetLandscape)
      .pipe(
        map((result) => result.matches),
        shareReplay()
      )
      .subscribe((isHandset) => (this.isHandset = isHandset));
  }

  ngOnDestroy(): void {
    if (this.isHandsetSubscription) {
      this.isHandsetSubscription.unsubscribe();
    }
  }

  signOut(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}

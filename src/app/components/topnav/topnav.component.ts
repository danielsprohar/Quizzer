import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { MatSidenav } from '@angular/material/sidenav'
import { Router } from '@angular/router'
import firebase from 'firebase/app'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { BreakpointService } from 'src/app/services/breakpoint.service'

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit, OnDestroy {
  private isHandsetSubscription?: Subscription

  @Input() drawer: MatSidenav
  isHandset: boolean = false
  user$: Observable<firebase.User | null>

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly breakpoint: BreakpointService,
    private readonly router: Router,
    public readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser()
    this.isHandsetSubscription = this.breakpoint
      .isHandsetAsObservable()
      .subscribe((isHandset) => (this.isHandset = isHandset))
  }

  ngOnDestroy(): void {
    if (this.isHandsetSubscription) {
      this.isHandsetSubscription.unsubscribe()
    }
  }

  signOut(): void {
    this.afAuth.signOut()
    this.router.navigate(['/'])
  }
}

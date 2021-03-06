import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { ReactiveFormsModule } from '@angular/forms'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'
import { HomeComponent } from './components/home/home.component'
import { NewSubjectDialogComponent } from './components/new-subject-dialog/new-subject-dialog.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { SidenavComponent } from './components/sidenav/sidenav.component'
import { TopnavComponent } from './components/topnav/topnav.component'
import { AuthModule } from './modules/auth/auth.module'
import { MaterialDesignModule } from './theme/material-design/material-design.module'

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    NotFoundComponent,
    SidenavComponent,
    TopnavComponent,
    HomeComponent,
    NewSubjectDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase, 'Quizzer'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialDesignModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 4000,
      },
    },
  ],
})
export class AppModule {}

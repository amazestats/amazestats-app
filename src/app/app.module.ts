import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from '@components/login/login.component'
import { HomeComponent } from '@components/home/home.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatListModule,
  MatMenuModule,
} from '@angular/material'
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from '@components/register/register.component'
import { TeamListComponent } from '@components/team-list/team-list.component'
import { DivisionListComponent } from '@components/division-list/division-list.component'
import { DivisionComponent } from '@components/division/division.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { UrlInterceptor } from '@providers/url-interceptor'
import { MatchListComponent } from '@components/match-list/match-list.component'
import { DivisionTableComponent } from '@components/division-table/division-table.component'
import { DivisionMatchListComponent } from '@components/division-match-list/division-match-list.component'
import { DivisionTeamListComponent } from '@components/division-team-list/division-team-list.component'
import { TeamDetailComponent } from '@components/team-detail/team-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TeamListComponent,
    DivisionListComponent,
    DivisionComponent,
    MatchListComponent,
    DivisionTableComponent,
    DivisionMatchListComponent,
    DivisionTeamListComponent,
    DivisionMatchListComponent,
    DivisionTeamListComponent,
    TeamDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

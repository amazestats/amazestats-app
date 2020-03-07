import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
} from '@angular/material'
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { TeamListComponent } from './team-list/team-list.component';
import { DivisionListComponent } from './division-list/division-list.component';
import { DivisionComponent } from './division/division.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './url-interceptor';
import { MatchListComponent } from './match-list/match-list.component';
import { DivisionTableComponent } from './division-table/division-table.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
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

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { RegisterComponent } from './register/register.component'
import { TeamListComponent } from './team-list/team-list.component'
import { DivisionListComponent } from './division-list/division-list.component'
import { DivisionComponent } from './division/division.component'
import { DivisionTableComponent } from './division-table/division-table.component'
import { DivisionMatchListComponent } from './division-match-list/division-match-list.component'
import { DivisionTeamListComponent } from './division-team-list/division-team-list.component'
import { TeamDetailComponent } from './team-detail/team-detail.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'home', component: HomeComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: 'teams', component: TeamListComponent, },
  { path: 'teams/:key', component: TeamDetailComponent, },
  { path: 'divisions', component: DivisionListComponent, },
  {
    path: 'divisions/:key',
    component: DivisionComponent,
    children: [
      { path: '', redirectTo: 'table', pathMatch: 'full', },
      { path: 'matches', component: DivisionMatchListComponent, },
      { path: 'table', component: DivisionTableComponent, },
      { path: 'teams', component: DivisionTeamListComponent, },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full', },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

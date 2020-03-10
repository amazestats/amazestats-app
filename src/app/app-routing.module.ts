import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '@components/login/login.component'
import { HomeComponent } from '@components/home/home.component'
import { RegisterComponent } from '@components/register/register.component'
import { TeamListComponent } from '@components/team-list/team-list.component'
import { DivisionListComponent } from '@components/division-list/division-list.component'
import { DivisionComponent } from '@components/division/division.component'
import { DivisionTableComponent } from '@components/division-table/division-table.component'
import { DivisionMatchListComponent } from '@components/division-match-list/division-match-list.component'
import { DivisionTeamListComponent } from '@components/division-team-list/division-team-list.component'
import { TeamDetailComponent } from '@components/team-detail/team-detail.component'

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

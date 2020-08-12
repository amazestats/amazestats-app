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
import { SettingsComponent } from '@components/settings/settings.component'
import { AuthenticationGuard } from './guards/authentication.guard'
import { AuthenticationResolver } from './resolvers/authentication.resolver'
import { AdminPanelComponent } from '@components/admin-panel/admin-panel.component'
import { AdminGuard } from './guards/admin.guard'
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: { isAuthenticated: AuthenticationResolver },
  },
  { path: 'home', component: HomeComponent, },
  {
    path: 'register',
    component: RegisterComponent,
    resolve: { isAuthenticated: AuthenticationResolver },
  },
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
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(
      m => m.AdminModule
    )
  },
  { path: '', redirectTo: '/home', pathMatch: 'full', },
  { path: '**', component: PageNotFoundComponent, },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

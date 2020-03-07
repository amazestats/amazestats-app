import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { RegisterComponent } from './register/register.component'
import { TeamListComponent } from './team-list/team-list.component'
import { DivisionListComponent } from './division-list/division-list.component'
import { DivisionComponent } from './division/division.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'home', component: HomeComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: 'teams', component: TeamListComponent, },
  { path: 'divisions/:key', component: DivisionComponent, },
  { path: 'divisions', component: DivisionListComponent, },
  { path: '', redirectTo: '/home', pathMatch: 'full', },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

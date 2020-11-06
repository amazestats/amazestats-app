import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UserPermissionManagementComponent } from './components/user-permission-management/user-permission-management.component'
import { RuleManagementComponent } from '@components/rule-management/rule-management.component'
import { TeamManagementComponent } from '@components/team-management/team-management.component'
import { UserListResolver } from 'app/resolvers/user-list.resolver'

const routes: Routes = [
  { path: '', redirectTo: 'user-permissions', pathMatch: 'full', },
  {
    path: 'user-permissions',
    component: UserPermissionManagementComponent,
    resolve: {
      users: UserListResolver
    }
  },
  {
    path: 'teams',
    component: TeamManagementComponent,
  },
  {
    path: 'rules',
    component: RuleManagementComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

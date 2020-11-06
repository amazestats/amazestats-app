import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { TeamManagementComponent } from '@components/team-management/team-management.component'
import { RuleManagementComponent } from '@components/rule-management/rule-management.component';
import { UserPermissionManagementComponent } from './components/user-permission-management/user-permission-management.component'

@NgModule({
  declarations: [
    RuleManagementComponent,
    TeamManagementComponent,
    UserPermissionManagementComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
  ]
})
export class AdminModule { }

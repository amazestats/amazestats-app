import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, } from '@angular/material'
import { AdminRoutingModule } from './admin-routing.module'
import { TeamManagementComponent } from '@components/team-management/team-management.component'
import { RuleManagementComponent } from '@components/rule-management/rule-management.component'
import { UserPermissionManagementComponent } from './components/user-permission-management/user-permission-management.component'
import { UserPermissionTableComponent } from './components/user-permission-table/user-permission-table.component'

@NgModule({
  declarations: [
    RuleManagementComponent,
    TeamManagementComponent,
    UserPermissionManagementComponent,
    UserPermissionTableComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatTableModule,
  ]
})
export class AdminModule { }

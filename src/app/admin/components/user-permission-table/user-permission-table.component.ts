import { Component, Input, OnInit } from '@angular/core'
import { User } from '@models/user'

@Component({
  selector: 'app-user-permission-table',
  templateUrl: './user-permission-table.component.html',
  styleUrls: ['./user-permission-table.component.scss']
})
export class UserPermissionTableComponent implements OnInit {

  @Input() users: User[]

  private displayedColumns = ['alias', 'id']
  private dataSource: User[]

  constructor() { }

  ngOnInit() {
    this.dataSource = this.users
  }

}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, } from '@angular/router'
import { User } from '@models/user'

@Component({
  selector: 'app-user-permission-management',
  templateUrl: './user-permission-management.component.html',
  styleUrls: ['./user-permission-management.component.scss']
})
export class UserPermissionManagementComponent implements OnInit {

  private users: User[] = []

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users
    })
  }

}

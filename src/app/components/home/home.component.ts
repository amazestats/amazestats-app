import { Component, OnInit } from '@angular/core'
import { UserService } from '@services/user.service';
import { User } from '@models/user';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private authenticated = false
  private user: User

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.userService.getUser(this.userService.getCurrentUser())
        .subscribe(user => {
          this.authenticated = true
          this.user = user
        })
    }
  }

}

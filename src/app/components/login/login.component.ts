import { Component, OnInit } from '@angular/core'
import { UserService } from '@services/user.service'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'
import { Location } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username = new FormControl('')
  private password = new FormControl('')

  private reason: string = ""

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private location: Location,
  ) {
    if (authService.isAuthenticated()) router.navigate(['/'])
  }

  ngOnInit() {
    const state = this.location.getState() as { navigationReason?: string }
    if (state.hasOwnProperty('navigationReason')) {
      this.reason = state.navigationReason
    }
  }

  login() {
    this.userService.login(this.username.value, this.password.value)
      .subscribe(res => {
        console.info(`Successfully logged in ${this.username.value}.`)
        console.info(`Received token: ${res.token}`)
        this.router.navigate(['/home'])
      }, error => {
        console.error('Could not login.', error)
        this.password.setValue('')
      })
  }

}

import { Component, OnInit } from '@angular/core'
import { UserService } from '@services/user.service'
import { FormControl, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'
import { Location } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),

  })

  private error: string = ""

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe(
      data => {
        if (data.isAuthenticated) {
          this.router.navigate(['/'])
        }
      }
    )


    const state = this.location.getState() as { navigationReason?: string }
    if (state.hasOwnProperty('navigationReason')) {
      this.error = state.navigationReason
    }
  }

  login() {
    const username = this.loginForm.controls['username'].value
    const password = this.loginForm.controls['password'].value
    this.userService.login(username, password)
      .subscribe(
        res => this.router.navigate(['/home']),
        error => {
          this.loginForm.patchValue({ password: '' })
          this.error = 'Username or password is incorrect.'
        })
  }

}

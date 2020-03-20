import { Component, OnInit } from '@angular/core'
import { UserService } from '@services/user.service'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthenticationService } from '@services/authentication.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    if (authService.isAuthenticated()) router.navigate(['/'])
  }

  private username = new FormControl('')
  private password = new FormControl('')

  ngOnInit() { }

  register() {
    this.userService.register(this.username.value, this.password.value)
      .subscribe(
        _res => {
          console.info('Successfully registered.')
          this.router.navigate(['/home'])
        },
        err => {
          console.error(err)
        },
        () => console.log("Register call completed.")

      )
  }

}

import { Component, OnInit } from '@angular/core'
import { UserService } from '@services/user.service'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

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

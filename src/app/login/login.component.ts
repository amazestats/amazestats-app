import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private username = new FormControl('')
  private password = new FormControl('')

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  login() {
    this.userService.login(this.username.value, this.password.value)
      .then(username => {
        console.info(`Successfully logged in ${username}.`)
      }, error => {
        console.error("Could not login.")
      })
  }

}

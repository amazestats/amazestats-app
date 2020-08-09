import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from '@services/authentication.service'
import { TeamService } from '@services/team.service'
import { DivisionService } from '@services/division.service'
import { Division } from '@models/division'
import { Team } from '@models/team'
import { UserService } from '@services/user.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  private divisions: Division[] = []
  private teams: Team[] = []

  private isAuthenticated = false

  constructor(
    private authService: AuthenticationService,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.divisionService.getDivisions()
      .subscribe(divisions => this.divisions = divisions)

    this.teamService.getTeams()
      .subscribe(teams => this.teams = teams)

    this.authService.isAuthenticated().subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated
      }
    )
  }

  getTeamsInDivision(divisionId: number) {
    return this.teams.filter(team => team.division == divisionId)
  }

  logout() {
    this.userService.logout()

    // TODO: If we are in a protected route we should route back to home
  }
}

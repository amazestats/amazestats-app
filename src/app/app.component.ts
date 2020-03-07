import { Component, OnInit } from '@angular/core';
import { DivisionService } from './division.service'
import { Division } from './division';
import { TeamService } from './team.service';
import { Team } from './team'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'vollui';
  private divisions: Division[] = []
  private teams: Team[] = []

  constructor(
    private divisionService: DivisionService,
    private teamService: TeamService,
  ) { }

  ngOnInit() {
    this.divisionService.getDivisions()
      .subscribe(divisions => this.divisions = divisions)

    this.teamService.getTeams()
      .subscribe(teams => this.teams = teams)
  }

  getTeamsInDivision(divisionId: number) {
    return this.teams.filter(team => team.division == divisionId)
  }
}

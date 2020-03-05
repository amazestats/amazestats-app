import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  private teams = []

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getTeams()
      .then(teams => {
        this.teams = teams
      })
      .catch(reason => {
        console.error(reason)
      })
  }

}

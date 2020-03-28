import { Component, OnInit } from '@angular/core'
import { TeamService } from '@services/team.service'
import { Team } from '@models/team'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  private team: Team

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      return this.teamService.getTeamByKey(paramMap.get('key'))
        .subscribe(team => this.team = team)
    })
  }

}

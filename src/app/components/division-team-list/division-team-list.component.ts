import { Component, OnInit, } from '@angular/core'
import { TeamService } from '@services/team.service'
import { Team } from '@models/team'
import { ActivatedRoute } from '@angular/router'
import { DivisionService } from '@services/division.service'

@Component({
  selector: 'app-division-team-list',
  templateUrl: './division-team-list.component.html',
  styleUrls: ['./division-team-list.component.scss']
})
export class DivisionTeamListComponent implements OnInit {

  private key: string
  private teams: Team[] = []

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private divisionService: DivisionService,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      return this.divisionService.getDivisionByKey(params.key)
        .subscribe(division => {
          this.teamService.getTeamsByDivision(division.id)
            .subscribe(teams => this.teams = teams)
        })
    })
  }

}

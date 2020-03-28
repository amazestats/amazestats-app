import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DivisionService } from '@services/division.service'
import { Team } from '@models/team'
import { Match } from '@models/match'
import { TeamService } from '@services/team.service'
import { MatchService } from '@services/match.service'

@Component({
  selector: 'app-division-match-list',
  templateUrl: './division-match-list.component.html',
  styleUrls: ['./division-match-list.component.scss']
})
export class DivisionMatchListComponent implements OnInit {

  private key: string
  private teams: Team[] = []
  private matches: Match[] = []

  constructor(
    private route: ActivatedRoute,
    private divisionService: DivisionService,
    private teamService: TeamService,
    private matchService: MatchService,
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.key = params.key

      this.divisionService.getDivisionByKey(params.key)
        .subscribe(division => {
          this.teamService.getTeamsByDivision(division.id)
            .subscribe(teams => this.teams = teams)

          this.matchService.getMatchesBySeason(division.seasons[0].id)
            .subscribe(matches => this.matches = matches)
        })
    })
  }
}

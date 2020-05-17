import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '@services/match.service';
import { ResultService } from '@services/result.service';
import { Match } from '@models/match';
import { Team } from '@models/team';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() match: Match
  @Input() teams: Team[]


  constructor(
    private matchService: MatchService,
    private resultService: ResultService,
  ) { }

  ngOnInit() {
  }

  getTeamNameById(id: number, teams: Team[]): string {
    return teams.find(team => team.id == id).name
  }

  showReferee(id: number, teams:Team[]): string {
    return id ? this.getTeamNameById(id, teams) : "No referee set"
  }
}
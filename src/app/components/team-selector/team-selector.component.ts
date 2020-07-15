import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '@services/match.service';
import { Team } from '@models/team';
import { Match } from '@models/match';

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit {

  @Input() teams: Team[]
  @Input() match: Match
  @Input() selectedTeam: number

  constructor(
    private matchService: MatchService,
  ) { }

  ngOnInit() {
  }

  setTeam(match: Match, team: number) {
    /* This method will have to be changed to accomodate different
    types of setting teams */
    this.matchService.setMatchReferee(match.id, team)
  }
}

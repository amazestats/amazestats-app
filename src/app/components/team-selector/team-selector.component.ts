import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() selectedTeamEvent = new EventEmitter<number>()

  constructor( ) { }

  ngOnInit() {
  }

  setTeam(team: number) {
    this.selectedTeamEvent.emit(team)
  }

  isTeamPlaying(teamId: number, match: Match) {
    return teamId == match.awayTeam || teamId == match.homeTeam
  }
}

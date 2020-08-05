import { Component, OnInit, Input } from '@angular/core';
import { Match } from '@models/match';
import { Team } from '@models/team'

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() match: Match
  @Input() teams: Team[]


  constructor() { }

  ngOnInit() {
  }

  getTeamNameById(id: number, teams: Team[]): string {
    return teams.find(team => team.id == id).name
  }

}
import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../match';
import { Team } from '../team';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  @Input() matches: Match[]
  @Input() teams: Team[]

  constructor() { }

  ngOnInit() {
    console.debug(this.matches)
  }

  getTeamNameById(id: number, teams: Team[]): string {
    return teams.find(team => team.id == id).name
  }
}

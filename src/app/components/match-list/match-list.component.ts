import { Component, OnInit, Input } from '@angular/core'
import { Match } from '@models/match'
import { Team } from '@models/team'

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  @Input() matches: Match[]
  @Input() teams: Team[]

  constructor() { }

  ngOnInit() { }

  getTeamNameById(id: number, teams: Team[]): string {
    return teams.find(team => team.id == id).name
  }
}

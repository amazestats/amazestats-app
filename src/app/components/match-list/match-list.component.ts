import { Component, OnInit, Input } from '@angular/core'
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSort, MatTableDataSource } from '@angular/material'
import { AuthenticationService } from '@services/authentication.service';
import { Match } from '@models/match'
import { Team } from '@models/team'
import { Set } from '@models/set'

interface MatchResult {
  date: string,
  homeTeam: string,
  awayTeam: string,
  score: string,
}

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MatchListComponent implements OnInit {

  @Input() matches: Match[]
  @Input() teams: Team[]

  columnsToDisplay = ['date', 'homeTeam', 'awayTeam', 'score'];
  dataSource: MatTableDataSource<MatchResult>;
  expandedElement: MatchResult | null;

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit() { }

  getTeamNameById(id: number, teams: Team[]): string {
    return teams.find(team => team.id == id).name
  }

  showReferee(id: number, teams:Team[]): string {
    return id ? this.getTeamNameById(id, teams) : "No referee set"
  }

  getConcatinatedSets(sets: Set[]): string {
    var homeWin: number = 0;
    var awayWin: number = 0;
    sets.forEach(
      set => {
      set.homeScore > set.awayScore ? homeWin++ : awayWin++
    });
    return homeWin + " - " + awayWin
  }

  setupDataSource(): MatTableDataSource<MatchResult> {
    let dataSource: MatTableDataSource<MatchResult> = new MatTableDataSource(
      this.matches.map(match => {
        let combSets: string = this.getConcatinatedSets(match.sets);
        return {
          date: 'Not here yet',
          homeTeam: this.getTeamNameById(match.homeTeam, this.teams),
          awayTeam:
            this.getTeamNameById(match.awayTeam, this.teams),
          score: combSets,
        }
      }))

      return dataSource;
  }
}

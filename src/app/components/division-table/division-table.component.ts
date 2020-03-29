import { Component, OnInit, ViewChild } from '@angular/core'
import { Match } from '@models/match'
import { Team } from '@models/team'
import { ResultService } from '@services/result.service'
import { MatSort, MatTableDataSource } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { DivisionService } from '@services/division.service'
import { TeamService } from '@services/team.service'
import { MatchService } from '@services/match.service'
import { map } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { Season } from '@models/season'
import { SeasonService } from '@services/season.service'

interface TeamResult {
  position: number,
  teamName: string,
  matchesPlayed: number,
  matchesWon: number,
  matchesLost: number,
  points: number,
  setsWon: number,
  setsLost: number,
}

@Component({
  selector: 'app-division-table',
  templateUrl: './division-table.component.html',
  styleUrls: ['./division-table.component.scss']
})
export class DivisionTableComponent implements OnInit {

  private key: string
  private seasons: Season[] = []
  private season: Season
  private matches: Match[]
  private teams: Team[]

  displayedColumns: string[] = [
    'position',
    'teamName',
    'matchesPlayed',
    'points',
    'matchesWon',
    'matchesLost',
    'sets',
  ]

  dataSource: MatTableDataSource<TeamResult>

  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private divisionService: DivisionService,
    private seasonService: SeasonService,
    private teamService: TeamService,
    private matchService: MatchService,
  ) { }

  ngOnInit() {
    combineLatest([this.route.parent.params, this.route.queryParams])
      .pipe(map(
        ([params, queryParams]) => ({ params, queryParams })
      )).subscribe(route => {
        this.key = route.params.key

        this.divisionService.getDivisionByKey(route.params.key)
          .subscribe(division => {
            this.seasons = division.seasons

            // If we have a query parameter for season we use it
            let season = route.queryParams.season == null ?
              division.seasons[0].id : division.seasons.find(
                season => season.key === route.queryParams.season).id

            this.seasonChanged(season)
          })
      })

  }

  setupDataSource() {
    this.dataSource = new MatTableDataSource(
      this.teams.map(team => {
        const matches = this.matches
          .filter(match =>
            match.homeTeam == team.id ||
            match.awayTeam == team.id)
        const matchesWon =
          this.resultService.getMatchesWon(team, matches).length

        return {
          position: 1,
          teamName: team.name,
          matchesPlayed:
            this.resultService.getMatchesPlayed(team, matches).length,
          matchesWon,
          matchesLost:
            this.resultService.getMatchesLost(team, matches).length,
          points:
            matchesWon * 3, // TODO: Move logic to result service
          setsWon: this.resultService.getSetsWon(team, matches),
          setsLost: this.resultService.getSetsLost(team, matches),
        }
      }))

    this.dataSource.sort = this.sort
  }

  seasonChanged(season: number) {
    this.seasonService.getSeasonById(season)
      .subscribe(season => {
        this.season = season
        this.updateQuery(season.key)
      })

    const teams$ = this.teamService.getTeamsBySeason(season)
    const matches$ = this.matchService.getMatchesBySeason(season)

    combineLatest([teams$, matches$]).pipe(map(
      ([teams, matches]) => ({ teams, matches })
    )).subscribe(pair => {
      this.teams = pair.teams
      this.matches = pair.matches

      this.setupDataSource()
    })
  }

  private selectedSeason(): number {
    return this.season != null ? this.season.id : null
  }

  private updateQuery(season: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { season },
        queryParamsHandling: 'merge'
      }
    )
  }
}

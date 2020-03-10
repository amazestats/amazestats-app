import { Component, OnInit, } from '@angular/core';
import { TeamService } from '@services/team.service';
import { Team } from '@models/team';
import { ActivatedRoute } from '@angular/router';

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
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.key = this.route.parent.snapshot.paramMap.get('key');

    this.teamService.getTeamsByDivisionKey(this.key)
      .subscribe(teams => this.teams = teams)
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Division } from '../division';
import { DivisionService } from '../division.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Team } from '../team';


@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  private division$: Observable<Division>

  constructor(
    private divisionService: DivisionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.division$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.divisionService.getDivisionByKey(params.get('key'))))
  }

  getTeamNameById(id: number, teams: Team[]): string {
    return teams.find(team => team.id == id).name
  }
}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Division } from '@models/division'
import { DivisionService } from '@services/division.service'
import { switchMap, find, map } from 'rxjs/operators'
import { Observable } from 'rxjs'


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
      switchMap((params: ParamMap) => {
        return this.divisionService.getDivisionByKey(params.get('key'))
      }))
  }
}

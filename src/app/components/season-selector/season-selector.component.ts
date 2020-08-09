import { Component, OnInit, Input, Output } from '@angular/core'
import { Season } from '@models/season'
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'app-season-selector',
  templateUrl: './season-selector.component.html',
  styleUrls: ['./season-selector.component.scss']
})
export class SeasonSelectorComponent implements OnInit {

  @Input() seasons: Season[]

  @Input() selectedOption: number

  @Output() selected = new EventEmitter<number>()

  constructor() { }

  ngOnInit() { }

  select(season: number) {
    this.selected.emit(season)
  }
}

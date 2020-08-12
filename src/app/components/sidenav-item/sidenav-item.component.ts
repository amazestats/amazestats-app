import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss']
})
export class SidenavItemComponent implements OnInit {

  @Input() text: string
  @Input() component: string

  @ViewChild('itemTemplate', { static: true }) template: TemplateRef<any>

  constructor() { }

  ngOnInit() {
  }

}

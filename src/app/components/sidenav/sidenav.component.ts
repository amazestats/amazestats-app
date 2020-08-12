import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { SidenavItemComponent } from '@components/sidenav-item/sidenav-item.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ContentChildren(SidenavItemComponent) children:
    QueryList<SidenavItemComponent>

  constructor() { }

  ngOnInit() {
  }
}

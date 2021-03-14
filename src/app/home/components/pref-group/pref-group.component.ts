import { Component, Input, OnInit } from '@angular/core';
import { PrefGroup, PrefItem } from '../../../core/services/settings/pref';

@Component({
  selector: 'app-pref-group',
  templateUrl: './pref-group.component.html',
  styleUrls: ['./pref-group.component.scss']
})
export class PrefGroupComponent implements OnInit {

  @Input('title')
  title: string;

  @Input('groups')
  groups: PrefGroup[];

  @Input('items')
  items: PrefItem[];

  constructor() { }

  ngOnInit(): void {
  }

}

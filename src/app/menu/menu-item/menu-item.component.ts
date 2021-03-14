import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { MenuItem } from '../menu-button';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input('role')
  role: 'button' | 'menu' | 'divider' | 'checkbox';

  @Input('label')
  label: string;

  @Input('symbol')
  symbol: symbol;

  @Input('accel')
  accel: string;

  @Input('list')
  submenu: MenuItem[];

  showSubmenu = false;

  @HostBinding('class.divider')
  get isDivider(): boolean {
    return this.role === 'divider';
  }

  constructor(
    private menu: MenuService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('click')
  onClick(): void {
    if (this.role === 'button') {
      // console.log('MenuItem clicked');
      document.dispatchEvent(new Event('click'));
      this.menu.dispatch(this.symbol);
    }
  }

}

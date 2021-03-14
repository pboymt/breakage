import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { MenuButton, MenuItem } from '../menu-button';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {

  @Input('option')
  option: MenuButton;

  // @Input('activated')
  // activated = false;

  // @Input('title')
  // title: string;

  // @Input('list')
  // list: MenuItem[];

  // @Input('accel')
  // accel: string;

  @Output('menu-open')
  menuOpenEvent = new EventEmitter();

  // @HostBinding('class.')
  // get classActivated(): boolean {
  //   return this.activated;
  // }
  // altEvent: () => unknown;

  constructor(
    private event: EventManager
  ) { }

  ngOnInit(): void {
    if (this.option.accel) {
      this.event.addGlobalEventListener('document', `keydown.alt.${this.option.accel}`, () => {
        this.option.activated = !this.option.activated;
      });
    }
  }

  @HostListener('document:click')
  closeAllMenu(): void {
    this.option.activated = false;
  }

  // @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    e.stopPropagation();
    // this.activated = !this.activated;
    this.menuOpenEvent.emit();
  }

}

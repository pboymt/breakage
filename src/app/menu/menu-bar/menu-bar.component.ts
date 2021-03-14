import { ApplicationRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { MenuButton } from '../menu-button';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  @Input('list')
  list: MenuButton[];

  constructor(
    private event: EventManager,
    private app: ApplicationRef
  ) { }

  ngOnInit(): void {
    // this.event.addGlobalEventListener('document', 'click', () => {
    //   this.list.forEach(v => v.activated = false);
    // });
  }

  menuOpen(index: number): void {
    if (this.list[index].activated) {
      this.list[index].activated = false;
    } else {
      this.list.forEach((v, i) => {
        v.activated = i === index;
      });
    }
  }

  menuChange(index: number): void {
    if (this.list.findIndex(v => v.activated) > -1) {
      this.list.forEach((v, i) => v.activated = i === index);
    }
  }

}

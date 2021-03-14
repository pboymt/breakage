import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { TabInfo, TabsManagerService } from '../services/tabs-manager/tabs-manager.service';

@Component({
  selector: 'app-document-tabs',
  templateUrl: './document-tabs.component.html',
  styleUrls: ['./document-tabs.component.scss']
})
export class DocumentTabsComponent implements OnInit {

  get order(): TabInfo[] {
    const list: TabInfo[] = [];
    this.tabsManager.tabsOrder.forEach(v => {
      list.push(this.tabInfo(v));
    });
    return list;
  }

  tabInfo(id: string): TabInfo {
    return this.tabsManager.getTab(id);
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(e: WheelEvent): void {
    // console.log(e.deltaY);
    (this.ele.nativeElement as HTMLElement).scrollBy({ left: e.deltaY * 2, behavior: 'smooth' });
  }

  constructor(
    private ele: ElementRef,
    public tabsManager: TabsManagerService
  ) { }

  ngOnInit(): void {
  }

}

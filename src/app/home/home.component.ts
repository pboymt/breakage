import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElectronService } from '../core/services';
import { HistoryService } from "../core/services/history/history.service";
import { TabsManagerService } from '../document/services/tabs-manager/tabs-manager.service';
import { DocumentHistory } from "../core/services/entities";
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  histories: DocumentHistory[] = [];
  historiesSubscription: Subscription;

  constructor(
    private menuService: MenuService,
    private tabsManager: TabsManagerService,
    private historyService: HistoryService,
    private electron: ElectronService
  ) { }

  ngOnInit(): void {
    this.historiesSubscription = this.historyService.history$.subscribe((value) => {
      this.histories = value;
    });
    this.historyService.refresh();
  }

  ngOnDestroy(): void {
    this.historiesSubscription.unsubscribe();
  }

  open(): void {
    // this.tabsManager.addTab('test doc', ['/doc', 'aaa']);
    this.menuService.open_file();
  }

  open_history(item: DocumentHistory): void {
    this.tabsManager.addTab(item.filepath, item.filename);
  }

  open_pref(): void {
    this.tabsManager.addTab('#pref');
  }

}

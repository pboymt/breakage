import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TabState } from './tab-state';
import { HistoryService } from '../../../core/services/history/history.service';

export type SpecialRef = '#home' | '#info' | '#pref';

export interface TabInfo {
  id: string;
  ref: SpecialRef | string;
  title: string;
  route_path: string[];
  state?: TabState
}

@Injectable({
  providedIn: 'root'
})
export class TabsManagerService {

  tabs: { [id: string]: TabInfo } = {};
  tabsOrder: Set<string> = new Set();

  get tabsCount(): number {
    return this.tabsOrder.size;
  }

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private history: HistoryService
  ) {

  }

  addTab(ref: SpecialRef): string;
  addTab(ref: string, title: string, change_tab?: boolean): string;
  addTab(ref: SpecialRef | string, title = 'Document', change_tab = true): string | undefined {
    if (ref === '#home') {
      this.ngZone.run(() => {
        this.router.navigate(['/home']);
      });
    } else if (ref === '#pref') {
      const t = this.findTab(ref);
      if (t === undefined) {
        const new_id = this.guid();
        this.tabs[new_id] = {
          id: new_id,
          title: '设置',
          ref,
          route_path: ['/pref']
        };
        this.tabsOrder.add(new_id);
        if (change_tab) {
          this.changeTab(new_id);
        }
      } else {
        this.ngZone.run(() => {
          this.router.navigate(['/pref']);
        });
      }
    } else {
      const t = this.findTab(ref);
      if (t === undefined) {
        const new_id = this.guid();
        this.tabs[new_id] = {
          id: new_id,
          title,
          ref,
          route_path: ['/doc', new_id]
        };
        this.tabsOrder.add(new_id);
        if (change_tab) {
          this.changeTab(new_id);
        }
        return new_id;
      } else {
        this.ngZone.run(() => {
          this.router.navigate(['/doc', t]);
        });
      }
    }
  }

  closeTab(id: string): void {
    if (this.tabs[id] !== undefined) {
      this.ngZone.run(() => {
        this.router.navigate(['/home']);
      });
      this.tabsOrder.delete(id);
      delete this.tabs[id];
    }
  }

  getTab(id: string): TabInfo {
    return this.tabs[id];
  }

  changeTab(id: string): boolean {
    if (this.tabs[id] !== undefined) {
      const tab = this.tabs[id];
      switch (tab.ref) {
        case '#home':
          this.ngZone.run(() => {
            this.router.navigate(['/home']);
          });
          break;
        case '#info':
          this.ngZone.run(() => {
            this.router.navigate(['/detail']);
          });
          break;
        case '#pref':
          this.ngZone.run(() => {
            this.router.navigate(['/pref']);
          });
          break;
        default:
          this.ngZone.run(() => {
            this.router.navigate(['/doc', id]);
            this.history.addHistory(tab.ref);
          });
          break;
      }
      return true;
    }
    return false;
  }

  private guid() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private findTab(ref: string): string | undefined {
    const tab = Object.entries(this.tabs).find(([, v]) => {
      if (v.ref === ref) {
        return true;
      }
      return false;
    });
    if (tab === undefined) {
      return;
    } else {
      return tab[0];
    }
  }
}

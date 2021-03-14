import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TabsManagerService } from '../document/services/tabs-manager/tabs-manager.service';
import { ElectronService, HistoryService } from '../core/services';
import { AppConfig } from '../../environments/environment';
import { MenuButton, MenuItem } from './menu-button';
import { EventManager } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menubar: MenuButton[];

  private menuevents: Map<symbol, () => unknown> = new Map();
  private keybindings: Map<string, () => unknown> = new Map();


  constructor(
    private electron: ElectronService,
    private translate: TranslateService,
    private tabsManager: TabsManagerService,
    private historyService: HistoryService,
    private event: EventManager
  ) { }

  init(menubuttons: MenuButton[]): void {
    for (const menubutton of menubuttons) {
      this.initList(menubutton.list);
    }
    // this.event.addGlobalEventListener('document', `keydown`, (e: KeyboardEvent) => {
    //   let keys = '';
    //   if (e.ctrlKey) {
    //     keys += 'ctrl';
    //   }
    //   if (e.shiftKey) {
    //     keys += '+shift';
    //   }
    //   if (e.altKey) {
    //     keys += '+alt';
    //   }
    //   if (e.key) {
    //     keys += `+${e.key.toLowerCase()}`;
    //   }
    //   keys = keys.replace(/^\+/, '');
    //   console.log(keys);
    //   if (this.keybindings.has(keys)) {
    //     console.log('has', keys);
    //     this.keybindings.get(keys)();
    //   }
    // });
  }

  private initList(list: MenuItem[]) {
    for (const item of list) {
      if (item.role === 'button') {
        this.menuevents.set(item.symbol, item.click);
        if (item.accel !== undefined) {
          console.log('Bind Global Event');
          this.register(item.accel, item.click);
        }
      } else if (item.role === 'menu') {
        this.initList(item.submenu);
      }
    }
  }

  dispatch(sym: symbol): void {
    if (this.menuevents.has(sym)) {
      this.menuevents.get(sym)();
    }
  }

  register(keybinding: string, handler: () => unknown): void {
    const kb = keybinding.replace(/\+/g, '.').toLowerCase().replace('ctrl', 'control');
    this.event.addGlobalEventListener('document', `keydown.${kb}`, handler);
    // this.keybindings.set(keybinding.toLowerCase(), handler);
  }

  async initMenu(): Promise<void> {
    const isProd = AppConfig.production;
    if (this.electron.isElectron) {
      const Menu = this.electron.remote.Menu;
      const devMenus: Electron.MenuItemConstructorOptions[] = [
        {
          label: await this.get('MENU.VIEW.RELOAD'),
          role: 'reload'
        },
        {
          label: await this.get('MENU.VIEW.FORCERELOAD'),
          role: 'forceReload'
        },
        {
          label: await this.get('MENU.VIEW.TOGGLEDEVTOOLS'),
          role: 'toggleDevTools'
        }
      ];
      const template: Electron.MenuItemConstructorOptions[] = [ // Electron.MenuItem
        {
          id: 'openfile',
          label: await this.get('MENU.FILE._'),
          submenu: [
            {
              label: await this.get('MENU.FILE.OPEN_'),
              click: this.open_file.bind(this)
            },
            {
              label: await this.get('MENU.FILE.CLOSE'),
              role: 'close'
            }
          ]
        },
        {
          label: await this.get('MENU.VIEW._'),
          submenu: [
            ...(isProd ? [] : devMenus),
            { type: 'separator' },
            {
              label: await this.get('MENU.VIEW.RESETZOOM'),
              role: 'resetZoom'
            },
            {
              label: await this.get('MENU.VIEW.ZOOMIN'),
              role: 'zoomIn'
            },
            {
              label: await this.get('MENU.VIEW.ZOOMOUT'),
              role: 'zoomOut'
            },
            { type: 'separator' },
            {
              label: await this.get('MENU.VIEW.TOGGLEFULLSCREEN'),
              role: 'togglefullscreen'
            }
          ]
        },
        {
          label: await this.get('MENU.WINDOW._'),
          submenu: [
            {
              label: await this.get('MENU.WINDOW.MINIMIZE'),
              role: 'minimize'
            },
            // {
            //   label: await this.get('MENU.WINDOW.ZOOM'),
            //   role: 'zoom'
            // }
          ]
        },
      ];
      const menu = Menu.buildFromTemplate(template);
      this.electron.remote.Menu.setApplicationMenu(menu);
    }
  }

  async open_file(): Promise<void> {
    const result = this.electron.remote.dialog.showOpenDialogSync({
      title: await this.get('DIALOG.OPENFILE'),
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'PDF', extensions: ['pdf'] }
      ]
    });
    console.log(result);
    if (result !== undefined) {
      if (result.length > 0) {
        result.forEach((v) => {
          const filepath = v;
          // const ref = this.electron.url.pathToFileURL(filepath).toString();
          const filename = this.electron.path.basename(filepath, '.pdf');
          this.tabsManager.addTab(filepath, filename);
        });
      }
    }
  }

  async get(id: string): Promise<string> {
    return await this.translate.get(id).toPromise<string>();
  }
}

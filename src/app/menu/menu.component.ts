import { ApplicationRef, Component, HostBinding, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ElectronService } from '../core/services';
import { TabsManagerService } from '../document/services/tabs-manager/tabs-manager.service';
import { MenuButton } from './menu-button';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menubuttons: MenuButton[] = [
    {
      activated: false,
      title: 'MENU.FILE._',
      accel: 'F',
      list: [
        {
          role: 'button',
          label: 'MENU.FILE.OPEN_',
          accel: 'Ctrl+O',
          symbol: Symbol('MenuItem'),
          click: (): void => {
            this.menu.open_file();
          }
        },
        {
          role: 'divider'
        },
        {
          role: 'button',
          label: 'MENU.FILE.PREF',
          accel: 'Ctrl+,',
          symbol: Symbol('MenuItem'),
          click: (): void => {
            this.tabs.addTab('#pref');
          }
        }
      ]
    },
    {
      activated: false,
      title: 'MENU.VIEW._',
      accel: 'V',
      list: [
        {
          role: 'button',
          label: 'MENU.VIEW.RELOAD',
          accel: 'Ctrl+R',
          symbol: Symbol('MenuItem'),
          click: (): void => {
            this.electron.remote.getCurrentWebContents().reload();
          }
        },
        {
          role: 'button',
          label: 'MENU.VIEW.FORCERELOAD',
          accel: 'Ctrl+Shit+R',
          symbol: Symbol('MenuItem'),
          click: (): void => {
            this.electron.remote.getCurrentWebContents().reloadIgnoringCache();
          }
        },
        {
          role: 'divider'
        },
        {
          role: 'menu',
          label: 'MENU.VIEW.APPEARANCE._',
          submenu: [
            {
              role: 'button',
              label: 'MENU.VIEW.APPEARANCE.TOGGLEFULLSCREEN',
              accel: 'F11',
              symbol: Symbol('MenuItem'),
              click: (): void => {
                const win = this.electron.remote.getCurrentWindow();
                win.setFullScreen(!win.isFullScreen());
              }
            },
            {
              role: 'divider'
            },
            {
              role: 'button',
              label: 'MENU.VIEW.APPEARANCE.ZOOMIN',
              accel: 'Ctrl+=',
              symbol: Symbol('MenuItem'),
              click: (): void => {
                const win = this.electron.remote.getCurrentWebContents();
                win.setZoomLevel(win.getZoomLevel() + 1);
              }
            },
            {
              role: 'button',
              label: 'MENU.VIEW.APPEARANCE.ZOOMOUT',
              accel: 'Ctrl+-',
              symbol: Symbol('MenuItem'),
              click: (): void => {
                const win = this.electron.remote.getCurrentWebContents();
                win.setZoomLevel(win.getZoomLevel() - 1);
              }
            },
            {
              role: 'button',
              label: 'MENU.VIEW.APPEARANCE.RESETZOOM',
              accel: 'Ctrl+0',
              symbol: Symbol('MenuItem'),
              click: (): void => {
                const win = this.electron.remote.getCurrentWebContents();
                win.setZoomLevel(0);
              }
            },
          ]
        },
        {
          role: 'divider'
        },
        {
          role: 'button',
          label: 'MENU.VIEW.TOGGLEDEVTOOLS',
          accel: 'Ctrl+Shift+I',
          symbol: Symbol('MenuItem'),
          click: (): void => {
            this.electron.remote.getCurrentWebContents().toggleDevTools();
          }
        },
      ]
    }
  ];

  maximize_status: Observable<string> = new Observable((s) => {
    // console.log('Watch Maximize Init');
    const win = this.electron.remote.getCurrentWindow();
    win.removeAllListeners('unmaximize');
    win.removeAllListeners('maximize');
    s.next(win.isMaximized() ? 'chrome-restore' : 'chrome-maximize');
    const a = () => {
      // console.log('Watch UnMaximize');
      s.next('chrome-maximize');
      this.app.tick();
    };
    const b = () => {
      // console.log('Watch Maximize');
      s.next('chrome-restore');
      this.app.tick();
    };
    win.on('unmaximize', a);
    win.on('maximize', b);
    return function unsubscribe() {
      win.off('unmaximize', a);
      win.off('maximize', b);
    };
  });

  show_mr_button = new Observable<boolean>((s) => {
    const win = this.electron.remote.getCurrentWindow();
    win.removeAllListeners('enter-full-screen');
    win.removeAllListeners('leave-full-screen');
    s.next(!win.isFullScreen());
    const a = () => {
      s.next(false);
      this.app.tick();
    };
    const b = () => {
      s.next(true);
      this.app.tick();
    };
    win.on('enter-full-screen', a);
    win.on('leave-full-screen', b);
    return function unsubscribe() {
      win.off('enter-full-screen', a);
      win.off('leave-full-screen', b);
    };
  });

  @HostBinding('class.blur')
  isblur = false;

  get win(): Electron.BrowserWindow {
    return this.electron.remote.getCurrentWindow();
  }

  constructor(
    private menu: MenuService,
    private electron: ElectronService,
    private app: ApplicationRef,
    private tabs: TabsManagerService
  ) { }

  ngOnInit(): void {
    // this.maximize_status = 
    const win = this.electron.remote.getCurrentWindow();
    win.removeAllListeners('focus');
    win.removeAllListeners('blur');
    this.win.on('focus', () => {
      // console.log('window focus');
      this.isblur = false;
      this.app.tick();
    });
    this.win.on('blur', () => {
      // console.log('window blur');
      this.isblur = true;
      this.app.tick();
    });
    this.menu.init(this.menubuttons);
  }

  win_minimize(): void {
    this.win.minimize();
  }

  win_max_or_re(): void {
    if (this.win.isMaximized()) {
      this.win.restore();
    } else {
      this.win.maximize();
    }
  }

  win_close(): void {
    console.log('Close Window', this.electron.remote.getCurrentWindow().closable);
    if (this.win.webContents.isDevToolsOpened()) {
      this.win.webContents.closeDevTools();
    }
    this.win.close();
  }

}

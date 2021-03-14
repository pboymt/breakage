import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
// import { AppConfig } from '../environments/environment';
// import { version } from 'pdfjs-dist';
import { TabsManagerService } from './document/services/tabs-manager/tabs-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private tabsManager: TabsManagerService,
    private router: Router
  ) {
    this.translate.setDefaultLang('zh');
    // console.log('AppConfig', AppConfig);
    // console.log('PDF.js Version', version);
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      // console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      // console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
    console.log(this.router);
    console.log(this.tabsManager.tabsCount);
  }
}

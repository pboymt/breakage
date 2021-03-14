import { Injectable } from '@angular/core';
import { ElectronService } from "../electron/electron.service";
import { AppConfig } from '../../../../environments/environment';
import fs from 'fs';
import path from 'path';
import { PrefGroup } from "./pref";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  static prefList: PrefGroup[] = [];

  private fs: typeof fs;
  private path: typeof path;
  private app: Electron.App;

  constructor(
    private electron: ElectronService
  ) {
    this.fs = this.electron.fs;
    this.path = this.electron.path;
    this.app = this.electron.remote.app;
  }

  get dataPath(): string {
    let dataPath: string;
    if (AppConfig.production) {
      dataPath = this.path.join(this.app.getPath('appData'), 'data');

    } else {
      dataPath = this.path.join(process.cwd(), '.data');
    }
    if (!this.fs.existsSync(dataPath)) {
      this.fs.mkdirSync(dataPath, { recursive: true });
    }
    return this.path.join(dataPath, 'data.db');
  }

  get APIBaiduAppId(): string | null {
    const appId = localStorage.getItem('api.baidu.appid');
    if (typeof appId === 'string' && appId.length > 0) {
      return appId;
    } else {
      return null;
    }
  }

  get APIBaiduSecretKey(): string | null {
    const secretKey = localStorage.getItem('api.baidu.secret');
    if (typeof secretKey === 'string' && secretKey.length > 0) {
      return secretKey;
    } else {
      return null;
    }
  }

  get APIBaiduAvailable(): boolean {
    return this.APIBaiduAppId !== null && this.APIBaiduSecretKey !== null;
  }

  setAPIBaidu(appId: string, secretKey: string): void {
    localStorage.setItem('api.baidu.appid', appId);
    localStorage.setItem('api.baidu.secret', secretKey);
  }


}

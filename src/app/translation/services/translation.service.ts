import { Injectable } from '@angular/core';
import { ElectronService, SettingsService } from '../../core/services';
import { BaiduService } from './baidu/baidu.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  originalText = '';
  resultText = '';

  constructor(
    private settings: SettingsService,
    private baidu: BaiduService,
    private electron: ElectronService
  ) { }

  async translate(originalText: string): Promise<void> {
    const [code, result] = await this.baidu.query(originalText);
    if (code === 0) {
      this.originalText = originalText;
      this.resultText = result.join('\n');
    } else {
      this.electron.remote.dialog.showMessageBoxSync({
        title: result[0],
        message: result[1]
      });
    }
  }
}

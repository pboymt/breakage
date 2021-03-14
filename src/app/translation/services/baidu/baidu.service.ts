import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectronService, SettingsService } from '../../../core/services';

interface BaiduTranslateRequest {
  [key: string]: string;
  q: string;
  from: 'auto' | string;
  to: string;
  appid: string;
  salt: string;
  sign: string;
}

interface BaiduTranslateResponse {
  from: string;
  to: string;
  trans_result: TranslateResult[];
  error_code: number;
}

interface TranslateResult {
  src: string;
  dst: string;
}

const BaiduTranslateErrorCode = {
  52000: ['成功'],
  52001: ['请求超时', '重试'],
  52002: ['系统错误', '重试'],
  52003: ['未授权用户', '请检查您的appid是否正确，或者服务是否开通'],
  54000: ['必填参数为空', '请检查是否少传参数'],
  54001: ['签名错误', '请检查您的签名生成方法'],
  54003: ['访问频率受限', '请降低您的调用频率，或进行身份认证后切换为高级版/尊享版'],
  54004: ['账户余额不足', '请前往管理控制台为账户充值'],
  54005: ['长query请求频繁', '请降低长query的发送频率，3s后再试'],
  58000: ['客户端IP非法', '检查个人资料里填写的IP地址是否正确，可前往开发者信息-基本信息修改，可前往开发者信息-基本信息修改'],
  58001: ['译文语言方向不支持', '检查译文语言是否在语言列表里'],
  58002: ['服务当前已关闭', '请前往管理控制台开启服务'],
  90107: ['认证未通过或未生效', '请前往我的认证查看认证进度'],
};

@Injectable({
  providedIn: 'root'
})
export class BaiduService {

  static url = 'https://fanyi-api.baidu.com/api/trans/vip/translate';

  constructor(
    private settings: SettingsService,
    private electron: ElectronService,
    private http: HttpClient
  ) { }

  async query(q: string): Promise<[number, string[]]> {
    if (this.settings.APIBaiduAvailable) {
      const from = 'auto', to = 'zh';
      const appid = this.settings.APIBaiduAppId;
      const secret = this.settings.APIBaiduSecretKey;
      const salt = this.salt;
      const sign = this.sign(`${this.settings.APIBaiduAppId}${q}${salt}${secret}`);
      const queryObject: BaiduTranslateRequest = {
        q,
        from,
        to,
        appid,
        salt,
        sign
      };
      const result = await this.http.post<Partial<BaiduTranslateResponse>>(BaiduService.url, new HttpParams({
        fromObject: queryObject,
        
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },

        observe: 'body',
        responseType: 'json'
      }).toPromise();
      console.log(result);
      if (!result.error_code) {
        return [0, result.trans_result.map(v => v.dst)];
      } else {
        return [result.error_code, BaiduTranslateErrorCode[result.error_code]];
      }
    } else {
      return [-1, ['服务不可用', '请前往设置完善您的百度翻译AppId和SecretKey']];
    }
  }

  private get salt(): string {
    return Date.now().toString();
  }

  private sign(str: string): string {
    return this.electron.md5(str);
  }
}

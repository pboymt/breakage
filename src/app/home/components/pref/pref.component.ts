import { Component, OnInit } from '@angular/core';
import { PrefGroup } from '../../../core/services/settings/pref';


@Component({
  selector: 'app-pref',
  templateUrl: './pref.component.html',
  styleUrls: ['./pref.component.scss']
})
export class PrefComponent implements OnInit {

  static prefList: PrefGroup[] = [
    {
      title: '翻译',
      groups: [
        {
          title: '百度翻译',
          items: [
            {
              title: 'APP ID',
              description: '百度翻译API的APP ID，可访问 https://api.fanyi.baidu.com/doc/12 查看申请教程。',
              key: 'api.baidu.appid',
              type: 'string',
              input: 'textbox',
            },
            {
              title: 'APP Secret',
              description: '百度翻译API的Secret，可访问 https://api.fanyi.baidu.com/doc/12 查看申请教程。',
              key: 'api.baidu.secret',
              type: 'string',
              input: 'textbox',
            }
          ]
        }
      ]
    }
  ];

  get list(): PrefGroup[] {
    return PrefComponent.prefList;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

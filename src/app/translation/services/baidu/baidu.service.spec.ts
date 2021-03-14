import { TestBed } from '@angular/core/testing';

import { BaiduService } from './baidu.service';

describe('BaiduService', () => {
  let service: BaiduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaiduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

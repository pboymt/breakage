import { TestBed } from '@angular/core/testing';

import { TabsManagerService } from './tabs-manager.service';

describe('TabsManagerService', () => {
  let service: TabsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

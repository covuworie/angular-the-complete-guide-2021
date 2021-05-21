import { TestBed } from '@angular/core/testing';

import { MyButtonService } from './my-button.service';

describe('MyButtonService', () => {
  let service: MyButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

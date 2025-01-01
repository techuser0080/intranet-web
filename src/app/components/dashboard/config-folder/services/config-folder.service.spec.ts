import { TestBed } from '@angular/core/testing';

import { ConfigFolderService } from './config-folder.service';

describe('ConfigFolderService', () => {
  let service: ConfigFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

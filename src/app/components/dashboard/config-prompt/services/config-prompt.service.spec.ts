import { TestBed } from '@angular/core/testing';

import { ConfigPromptService } from './config-prompt.service';

describe('ConfigPromptService', () => {
  let service: ConfigPromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigPromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

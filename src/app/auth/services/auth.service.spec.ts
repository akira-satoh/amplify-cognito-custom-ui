import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AmplifyService } from 'aws-amplify-angular';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AmplifyService
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});

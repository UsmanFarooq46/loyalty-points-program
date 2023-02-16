import { TestBed } from '@angular/core/testing';

import { AuthurizationInterceptor } from './authurization.interceptor';

describe('AuthurizationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthurizationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthurizationInterceptor = TestBed.inject(AuthurizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

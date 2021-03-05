import { TestBed } from '@angular/core/testing';

import { AbastecimentosService } from './abastecimentos.service';

describe('AbastecimentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbastecimentosService = TestBed.get(AbastecimentosService);
    expect(service).toBeTruthy();
  });
});

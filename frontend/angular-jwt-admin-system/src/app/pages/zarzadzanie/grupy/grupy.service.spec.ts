import { TestBed } from '@angular/core/testing';

import { GrupaService } from './grupy.service';

describe('RoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupaService = TestBed.get(GrupaService);
    expect(service).toBeTruthy();
  });
});

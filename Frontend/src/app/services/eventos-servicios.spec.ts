import { TestBed } from '@angular/core/testing';

import { EventosServicios } from './eventos-servicios';

describe('EventosServicios', () => {
  let service: EventosServicios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosServicios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InicializarDatosDeEntidadServiceService } from './inicializar-datos-de-entidad-service.service';

describe('InicializarDatosDeEntidadServiceService', () => {
  let service: InicializarDatosDeEntidadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InicializarDatosDeEntidadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicializarDatosDeEntidadesComponent } from './inicializar-datos-de-entidades.component';

describe('InicializarDatosDeEntidadesComponent', () => {
  let component: InicializarDatosDeEntidadesComponent;
  let fixture: ComponentFixture<InicializarDatosDeEntidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicializarDatosDeEntidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicializarDatosDeEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

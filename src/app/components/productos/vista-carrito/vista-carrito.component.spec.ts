import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCarritoComponent } from './vista-carrito.component';

describe('VistaCarritoComponent', () => {
  let component: VistaCarritoComponent;
  let fixture: ComponentFixture<VistaCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DibujaComponent } from './dibuja.component';

describe('DibujaComponent', () => {
  let component: DibujaComponent;
  let fixture: ComponentFixture<DibujaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DibujaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DibujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

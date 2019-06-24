import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDibujosComponent } from './mis-dibujos.component';

describe('MisDibujosComponent', () => {
  let component: MisDibujosComponent;
  let fixture: ComponentFixture<MisDibujosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisDibujosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisDibujosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

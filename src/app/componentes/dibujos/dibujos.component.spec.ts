import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DibujosComponent } from './dibujos.component';

describe('DibujosComponent', () => {
  let component: DibujosComponent;
  let fixture: ComponentFixture<DibujosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DibujosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DibujosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

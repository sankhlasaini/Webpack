import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtInfoComponent } from './govt-info.component';

describe('GovtInfoComponent', () => {
  let component: GovtInfoComponent;
  let fixture: ComponentFixture<GovtInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

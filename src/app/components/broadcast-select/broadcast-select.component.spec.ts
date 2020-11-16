import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastSelectComponent } from './broadcast-select.component';

describe('BroadcastSelectComponent', () => {
  let component: BroadcastSelectComponent;
  let fixture: ComponentFixture<BroadcastSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

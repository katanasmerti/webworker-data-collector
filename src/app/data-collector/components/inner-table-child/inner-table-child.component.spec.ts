import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerTableChildComponent } from './inner-table-child.component';

describe('InnerTableChildComponent', () => {
  let component: InnerTableChildComponent;
  let fixture: ComponentFixture<InnerTableChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerTableChildComponent]
    });
    fixture = TestBed.createComponent(InnerTableChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

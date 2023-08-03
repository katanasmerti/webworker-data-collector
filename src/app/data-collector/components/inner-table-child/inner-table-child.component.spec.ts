import { InnerTableChildComponent } from './inner-table-child.component';
import { TestBed, async } from '@angular/core/testing';
import { NzTableModule } from 'ng-zorro-antd/table';

describe('InnerTableChildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InnerTableChildComponent
      ],
      imports: [
        NzTableModule
      ]
    }).compileComponents();
  }));

  it('should create the InnerTableChildComponent', () => {
    const fixture = TestBed.createComponent(InnerTableChildComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});


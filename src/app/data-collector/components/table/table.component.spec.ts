import { TestBed, async } from '@angular/core/testing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableComponent,
      ],
      imports: [
        NzTableModule
      ]
    }).compileComponents();
  }));

  it('should create the TableComponent', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const comp = fixture.debugElement.componentInstance;
    expect(comp).toBeTruthy();
  });
});


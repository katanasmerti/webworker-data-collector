import {ChangeDetectorRef, Component} from '@angular/core';
import {Item} from "../../../shared/classes/item.class";
import {map, Subscription} from "rxjs";
import {WorkerService} from "../../../shared/services/worker.service";
import {IItem} from "../../../shared/interfaces/item.interface";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public items: Item[] = [];
  public pageSize: number = 0;

  private subscription$ = new Subscription();

  constructor(private workerService: WorkerService, private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.subscription$.add(this.workerService.workerData$
      .pipe(map((data: IItem[]) => data.slice(-10)))
      .subscribe((data: IItem[]) => {
          this.pageSize = data.length;
          this.items = data.map((el: IItem) => {
            return new Item(el);
          });
          this.cdr.markForCheck();
        }
      ));
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public trackByFn(index: number, item: Item): number {
    return item?.id as number;
  }
}

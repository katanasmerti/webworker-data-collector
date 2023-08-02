import {ChangeDetectorRef, Component} from '@angular/core';
import {Item} from "../../../shared/classes/item.class";
import { Subscription} from "rxjs";
import {DataService} from "../../../shared/services/data.service";
import {IItem} from "../../../shared/interfaces/item.interface";
import { plainToClass } from "class-transformer";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public items: Item[] = [];
  public pageSize: number = 0;

  private subscription$ = new Subscription();

  constructor(private workerService: DataService, private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.subscription$.add(this.workerService.stream$
      .subscribe((data: IItem[]) => {
          this.pageSize = data.length;
          this.items = data.map((el: IItem) => {
            const updatedItem = plainToClass(Item, el);
            updatedItem.setChild(el.child);
            return updatedItem;
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

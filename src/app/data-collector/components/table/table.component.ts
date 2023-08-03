import { ChangeDetectorRef, Component } from '@angular/core';
import { Item} from '../../../shared/classes/item.class';
import { Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { DataService } from '../../../shared/services/data.service';
import { IItem } from '../../../shared/interfaces/item.interface';
import { plainToClass } from "class-transformer";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  public items: Item[] = [];
  public pageSize: number = 0;
  public ids: string[] = [];

  private subscription$ = new Subscription();

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.subscription$.add(this.dataService.stream$
      .pipe(
        map((data: IItem[]) => {
          const updatedData = data.map((item: IItem, index: number) => {
            if (this.ids.at(index)) {
              item.id = this.ids[index];
            }
            return item;
          });

          return updatedData;
        })
      )
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

  public onIdsChanged(data: string[]): void {
    const updatedData = this.items.map((item: Item, index: number) => {
      if (data.at(index)) {
        item.id = data[index];
      }
      return item;
    });
    this.items = updatedData;
    this.ids = data;
  }

  public onClearFilters(): void {
    this.ids = [];
  }

  public trackByFn(index: number, item: Item): string {
    return item.id;
  }
}

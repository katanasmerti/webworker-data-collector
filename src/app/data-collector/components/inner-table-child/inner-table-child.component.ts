import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ItemChild } from '../../../shared/classes/item-child.class';

@Component({
  selector: 'app-inner-table-child',
  templateUrl: './inner-table-child.component.html',
  styleUrls: ['./inner-table-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InnerTableChildComponent {
  @Input() public data: ItemChild | undefined;
}

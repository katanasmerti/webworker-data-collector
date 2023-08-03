import { IBaseItem } from './base-item.interface';

export interface IItem extends IBaseItem{
  int: number;
  float: string;
  child: IBaseItem;
}

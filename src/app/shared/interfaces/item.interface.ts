import { IBaseItem } from './base-item.interface';

export interface IItem extends IBaseItem{
  id: number;
  int: number;
  float: string;
  color: string;
  child: IBaseItem;
}

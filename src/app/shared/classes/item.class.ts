import { ItemChild } from './item-child.class';
import { ColorStyle } from '../types/color-style.type';
import { IItem } from '../interfaces/item.interface';

export class Item {
  public readonly id: number | undefined;
  public readonly int: number | undefined;
  public readonly float: number | undefined;
  public readonly color: string | undefined;
  public child: ItemChild | undefined;

  constructor(data: IItem) {
    this.id = data.id;
    this.color = data.color;
    this.int = data.int;
    this.float = data.float;
    this.child = new ItemChild(data.child);
  }

  public get colorStyle(): ColorStyle {
    return {'background': this.color};
  }

  public get getChild(): ItemChild | undefined {
    return this.child;
  }

  // public setChild(data: IBaseItem) {
  //   this.child = plainToClass(ItemChild, data);
  // }
}





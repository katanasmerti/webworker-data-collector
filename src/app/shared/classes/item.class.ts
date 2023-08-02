import { ItemChild } from './item-child.class';
import { ColorStyle } from '../types/color-style.type';
import { IBaseItem } from '../interfaces/base-item.interface';
import { plainToClass } from "class-transformer";

export class Item {
  public readonly int: number;
  public readonly float: string;
  public readonly color: string;
  public id: string;
  public child: ItemChild;

  public get colorStyle(): ColorStyle {
    return {'background': this.color};
  }

  public get getChild(): ItemChild {
    return this.child;
  }

  public setChild(data: IBaseItem) {
    this.child = plainToClass(ItemChild, data);
  }
}





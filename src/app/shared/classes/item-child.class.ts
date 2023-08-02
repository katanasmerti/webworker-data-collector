import { ColorStyle } from '../types/color-style.type';
import { IBaseItem } from '../interfaces/base-item.interface';

export class ItemChild {
  public readonly id: number | undefined;
  public readonly color: string | undefined;

  constructor(data: IBaseItem) {
    this.id = data.id;
    this.color = data.color;
  }

  public get colorStyle(): ColorStyle {
    return {'background': this.color};
  }
}

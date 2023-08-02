import { ColorStyle } from '../types/color-style.type';

export class ItemChild {
  public readonly id: string;
  public readonly color: string;

  public get colorStyle(): ColorStyle {
    return {'background': this.color};
  }
}

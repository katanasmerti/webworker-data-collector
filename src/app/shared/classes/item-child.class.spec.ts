import { plainToClass } from 'class-transformer';
import { ItemChild } from './item-child.class';

describe('Item', () => {
  const item = plainToClass(ItemChild, {
    id: '2',
    color: '#00ea52',
  })

  it('Should return color', () => {
    expect(item.colorStyle['background'] === '#00ea52').toBeTruthy();
  });
});

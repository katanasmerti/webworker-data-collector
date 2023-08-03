import { plainToClass } from 'class-transformer';
import { Item } from './item.class';

describe('Item', () => {
  const item = plainToClass(Item, {
    id: '1',
    int: 1,
    float: '1.1',
    color: '#CE497C',
    child: {
      id: '2',
      color: '#00ea52',
    },
  })

  it('Should return color', () => {
    expect(item.colorStyle['background'] === '#CE497C').toBeTruthy();
  });

  it('Should return child', () => {
    expect(item.child.id === '2').toBeTruthy();
  });
});

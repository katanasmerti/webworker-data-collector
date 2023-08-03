import { IItem } from '../interfaces/item.interface';

export function getRandomStrFloat(): string {
  return (Math.random() * (18 - 1) + 1).toFixed(18);
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function generateItems(amount: number): IItem[] {
  const result = [];
  for (let i = 0; i < amount; i++) {
    const obj: IItem = {
      id: `${i + 1}`,
      int: i + 1,
      float: getRandomStrFloat(),
      color: getRandomColor(),
      child: {
        id: `${(i + 1) * 2}`,
        color: getRandomColor(),
      },
    };
  result.push(obj);
  }
  return result;
}



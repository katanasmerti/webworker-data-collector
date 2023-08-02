import { IItem } from '../interfaces/item.interface';

export function generateItems(amount: number): IItem[] {

  // Worker's function can't include exported helpers, that is why function declared here
  function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Worker's function can't include exported helpers, that is why function declared here
  function getRandomStrFloat(): string {
    return (Math.random() * (18 - 1) + 1).toFixed(18);
  }

  const result = [];
  for (let i = 0; i < amount; i++) {
    const obj: IItem = {
      id: i + 1,
      int: i + 1,
      float: getRandomStrFloat(),
      color: getRandomColor(),
      child: {
        id: (i + 1) * 2,
        color: getRandomColor(),
      },
    };
  result.push(obj);
  }
  return result;
}



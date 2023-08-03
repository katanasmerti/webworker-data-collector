import { getRandomColor, getRandomStrFloat } from './helpers';

describe('Helpers', () => {
  const colorRegexp = /#[a-f0-9]{6}/gi;

  it('Should return random color in correct format', () => {
    const color = getRandomColor();
    expect(color.match(colorRegexp)).toBeTruthy();
  });

  it('Should return random float str with 18 digits after after the decimal point', () => {
    const floatStrData = getRandomStrFloat().split('.');
    expect(floatStrData[1].length === 18).toBeTruthy();
  });
});

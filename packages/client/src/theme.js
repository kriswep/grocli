import { variant } from 'styled-system';

export const itemStyle = variant({
  // theme key for variant definitions
  scale: 'item',
  // component prop
  prop: 'variant',
});

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];
fontSizes.body = fontSizes[2];
fontSizes.display = fontSizes[5];

const colors = {
  text: '#fff',
  textDone: '#999',
  background: '#000e1a',
  primary: '#00f',
  secondary: '#00a',
  gray: '#eee',
  lightgray: '#fafafa',
  black: '#000e1a',
  white: '#fff',
  blue: '#007ce0',
  navy: '#004175',
};

export default {
  colors,
  fontSizes,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  radii: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  item: {
    done: {
      color: colors.textDone,
      'text-decoration-line': 'line-through',
    },
  },
};

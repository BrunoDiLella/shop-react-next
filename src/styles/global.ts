import { globalCss } from '.';

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 400,
  },

  '::-webkit-scrollbar': {
    width: '0.375rem',
    height: '0.375rem',
  },

  '::-webkit-scrollbar-corner': {
    height: 0,
    border: 'none',
    background: 'none',
  },

  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderRadius: '25px',
  },

  '::-webkit-scrollbar-thumb': {
    backgroundColor: '$green500',
    borderRadius: '3px',
    cursor: 'move',
  },
});

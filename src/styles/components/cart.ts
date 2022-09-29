import { keyframes, styled } from '..';

export const CartContainer = styled('div', {
  flex: 1,
  display: 'flex',
});

export const CartButtonOpen = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  textDecoration: 'none',
  padding: '0.75rem',
  cursor: 'pointer',
  position: 'relative',

  background: '$gray800',
  borderRadius: 6,
  border: 0,

  svg: {
    color: '$gray300',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    svg: {
      color: '$gray700',
    },
  },

  span: {
    width: '1.5rem',
    height: '1.5rem',
    position: 'absolute',
    right: '-7px',
    top: '-7px',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '$green500',
    zIndex: 1,

    borderRadius: '1000px',
    border: '3px solid $gray900',
    color: '$white',
    fontWeight: 'bold',
    fontSize: '$sm',
    lineHeight: 1.6,
  },
});

export const CartButtonClose = styled('button', {
  border: 0,
  lineHeight: 0,
  padding: 0,
  position: 'absolute',
  top: '-1.5rem',
  right: '1.5rem',

  background: 'transparent',
  color: '$gray700',
  cursor: 'pointer',

  '&:hover': {
    color: '$gray300',
  },
});

const moveToLeft = keyframes({
  '0%': { transform: 'translateX(110%)' },
  '100%': { transform: 'translateX(0%)' },
});

export const CartContent = styled('div', {
  width: '480px',
  minHeight: '100vh',
  position: 'fixed',
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 99,

  display: 'flex',
  flexDirection: 'column',
  padding: '3rem',

  background: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  animation: `${moveToLeft} 300ms ease-in-out`,

  strong: {
    fontSize: '$lg',
    lineHeight: 1.6,
    marginTop: '1.5rem',
  },

  '> button': {
    marginTop: '3rem',
  },

  '> div': {
    overflowY: 'auto',
    margin: '1.5rem 0 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
});

export const CartCardItem = styled('div', {
  display: 'flex',
  gap: '1.25rem',
  height: '6.125rem',
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 101.94,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
});

export const ItemDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  gap: '0.5rem',
  justifyContent: 'center',

  h1: {
    fontSize: '$md',
    color: '$gray300',
    fontWeight: 'normal',
  },

  span: {
    display: 'block',
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$gray100',
    lineHeight: 1.6,
  },

  button: {
    lineHeight: 1.6,
    maxWidth: 'fit-content',
    cursor: 'pointer',
    border: 0,
    background: 'transparent',
    color: '$green500',
    fontWeight: 'bold',
  },
});

export const CartItemSumary = styled('table', {
  width: '100%',
  lineHeight: 1.6,
  marginTop: 'auto',

  'tbody tr td': {
    fontSize: '$sm',
    color: '$gray300',
  },

  'td:nth-child(even)': {
    textAlign: 'right',
  },

  'tfoot tr td': {
    fontWeight: 'bold',
    color: '$gray100',
  },

  'tfoot tr td:nth-child(1)': {
    fontSize: '$md',
  },

  'tfoot tr td:nth-child(2)': {
    fontSize: '$xl',
  },
});

export const Overlay = styled('div', {
  position: 'fixed',
  inset: 0,
  zIndex: 9,
});

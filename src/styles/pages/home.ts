import { styled } from '..';

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
  marginBottom: '3rem',
});

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1.5rem',
    cursor: 'default',
    zIndex: 2,

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
});

export const ProductInfo = styled('div', {
  flex: 1,
  lineHeight: 1.6,

  position: 'absolute',
  zIndex: 3,

  strong: {
    fontSize: '$lg',
    color: '$gray100',
  },

  span: {
    display: 'block',
    fontSize: '$xl',
    fontWeight: 'bold',
    color: '$green300',
  },
});

export const CartButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  textDecoration: 'none',
  padding: '0.75rem',
  cursor: 'pointer',
  position: 'relative',

  background: '$green500',
  borderRadius: 6,
  border: 0,

  svg: {
    color: '$white',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    svg: {
      color: '$gray700',
    },
  },

  '&:hover': {
    background: '$green300',
  },
});

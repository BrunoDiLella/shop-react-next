import { styled } from '..';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    fontWeight: 'bold',
    lineHeight: 1.6,
    textDecoration: 'none',

    '&:hover': {
      color: '$green300',
    },
  },
});

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  marginTop: '4rem',

  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
});

export const ImageContainerGrid = styled('div', {
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  marginTop: '4rem',
});

export const ImageGrid = styled('div', {
  width: '140px',
  height: '140px',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
  borderRadius: '1000px',

  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  transition: 'transform 0.5s',

  img: {
    objectFit: 'cover',
  },

  '& + div': {
    marginLeft: '-3rem',
  },

  '&:hover': {
    transform: 'translateY(-1rem)',
  },
});

import { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';

import logoImg from '../assets/logo.svg';
import Image from 'next/image';
import { Container, Header } from '../styles/pages/app';
import Link from 'next/link';
import { Cart } from '../components/Cart';
import { CartProvider } from 'use-shopping-cart';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartProvider cartMode="checkout-session" stripe="" currency="BRL">
        <Header>
          <Link href="/" prefetch={false} passHref>
            <a>
              <Image src={logoImg} alt="" />
            </a>
          </Link>

          <Cart />
        </Header>

        <Component {...pageProps} />
      </CartProvider>
    </Container>
  );
}

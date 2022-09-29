import { GetServerSideProps } from 'next';
import { stripe } from '../../lib/stripe';
import {
  ImageContainer,
  ImageContainerGrid,
  ImageGrid,
  SuccessContainer,
} from '../../styles/pages/success';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

interface Product {
  name: string;
  imageUrl: string;
}

interface SuccessProps {
  customerName: string;
  products: Product[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        {products.length === 1 ? (
          <>
            <ImageContainer>
              <Image
                src={products[0].imageUrl}
                width={120}
                height={110}
                alt=""
              />
            </ImageContainer>

            <p>
              Uhuul <strong>{customerName}</strong>, sua{' '}
              <strong>{products[0].name}</strong> já está a caminho da sua casa.{' '}
            </p>
          </>
        ) : (
          <>
            <ImageContainerGrid>
              {products.map((product, index) => (
                <ImageGrid key={product.name} style={{ zIndex: index }}>
                  <Image
                    src={product.imageUrl}
                    width={120}
                    height={110}
                    alt=""
                  />
                </ImageGrid>
              ))}
            </ImageContainerGrid>

            <p>
              Uhuul <strong>{customerName}</strong>, sua compra de{' '}
              {products.length}
              <span> camisetas </span>já está a caminho da sua casa.
            </p>
          </>
        )}
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details.name;
  const products = session.line_items.data
    .map((product) => product.price.product as Stripe.Product)
    .map((item) => ({ name: item.name, imageUrl: item.images[0] }));

  return {
    props: {
      customerName,
      products,
    },
  };
};

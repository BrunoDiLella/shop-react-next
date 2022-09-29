import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';
import { useShoppingCart } from 'use-shopping-cart';
import { Button } from '../../components/Button';
import { stripe } from '../../lib/stripe';
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product';
import { priceFormatter } from '../../utils/formatter';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const { addItem, cartDetails } = useShoppingCart();

  const isExists = Object.values(cartDetails).some(
    (item) => item.id === product.id,
  );

  async function handleBuyProduct() {
    const newProduct = {
      ...product,
      sku: product.defaultPriceId,
      price: product.price,
      currency: 'BRL',
    };

    addItem(newProduct);
  }

  //  fallback: true
  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{priceFormatter.format(product.price / 100)}</span>

          <p>{product.description}</p>

          <Button disabled={isExists} onClick={handleBuyProduct}>
            {isExists ? 'Camiseta adicionada á sacola!' : 'Colocar na sacola'}
          </Button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MPhvhSYm7G1PXq' } }],
    fallback: 'blocking', // 'true or false
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};

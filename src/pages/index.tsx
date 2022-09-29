import {
  CartButton,
  HomeContainer,
  Product,
  ProductInfo,
} from '../styles/pages/home';
import { useKeenSlider } from 'keen-slider/react';
import { GetStaticProps } from 'next';
import { stripe } from '../lib/stripe';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import 'keen-slider/keen-slider.min.css';
import Stripe from 'stripe';
import { Handbag } from 'phosphor-react';
import { useShoppingCart } from 'use-shopping-cart';
import { priceFormatter } from '../utils/formatter';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  defaultPriceId: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  });

  const { addItem, cartDetails, removeItem } = useShoppingCart();

  function handleProductExist(productId: string) {
    const isExists = Object.values(cartDetails).some(
      (item) => item.id === productId,
    );

    return isExists;
  }

  async function handleBuyProduct(product: Product) {
    const isExists = handleProductExist(product.id);

    const newProduct = {
      ...product,
      sku: product.defaultPriceId,
      price: product.price,
      currency: 'BRL',
    };

    if (isExists) {
      removeItem(product.id);
    } else {
      addItem(newProduct);
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product className="keen-slider__slide" key={product.id}>
            <Link href={`/product/${product.id}`} prefetch={false}>
              <Image src={product.imageUrl} width={520} height={480} alt="" />
            </Link>
            <footer>
              <ProductInfo>
                <strong>{product.name}</strong>
                <span>{priceFormatter.format(product.price / 100)}</span>
              </ProductInfo>
              <CartButton onClick={() => handleBuyProduct(product)}>
                <Handbag
                  size={24}
                  weight={handleProductExist(product.id) ? 'fill' : 'bold'}
                />
              </CartButton>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      description: product.description,
      defaultPriceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Handbag, X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

import {
  CartButtonClose,
  CartButtonOpen,
  CartCardItem,
  CartContainer,
  CartContent,
  CartItemSumary,
  ImageContainer,
  ItemDetails,
  Overlay,
} from '../../styles/components/cart';
import { Button } from '../Button';

export function Cart() {
  const [showCart, setShowCart] = useState(false);

  const [isCreatingCheckoutSession, setCreatingCheckoutSession] =
    useState(false);

  const { asPath } = useRouter();

  const cart = useShoppingCart();
  const { removeItem, cartDetails, clearCart, formattedTotalPrice, cartCount } =
    cart;

  const cartEntries = Object.values(cartDetails).filter(Boolean);

  const products = cartEntries.map((item) => ({
    price: item.defaultPriceId,
    quantity: item.quantity,
  }));

  function handleToggleShowCart() {
    setShowCart(!showCart);
  }

  async function handleBuyProduct() {
    try {
      setCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        products,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
      setCreatingCheckoutSession(false);
    } catch (error) {
      setCreatingCheckoutSession(false);
      // Conectar com uma ferramenta de onservabilidade (Datadog / Sentry)
      alert('Fala ao redirecionar ao checkout!');
    }
  }

  const isRenderCart = asPath.includes('success');

  if (isRenderCart) {
    if (cartCount > 0) {
      clearCart();
    }
    return null;
  }

  return (
    <CartContainer>
      <CartButtonOpen onClick={handleToggleShowCart} disabled={cartCount === 0}>
        <Handbag size={24} weight="bold" />
        {cartCount > 0 && <span>{cartCount}</span>}
      </CartButtonOpen>

      {showCart && (
        <>
          <CartContent>
            <CartButtonClose onClick={handleToggleShowCart}>
              <X size={24} weight="bold" />
            </CartButtonClose>

            <strong>Sacola de compras</strong>

            <div>
              {cartEntries.map((entry) => (
                <CartCardItem key={entry.id}>
                  <ImageContainer>
                    <Image
                      src={entry.imageUrl}
                      width={200}
                      height={220}
                      alt=""
                    />
                  </ImageContainer>
                  <ItemDetails>
                    <h1>{entry.name}</h1>
                    <span>{entry.formattedValue} </span>
                    <button onClick={() => removeItem(entry.id)}>
                      Remover
                    </button>
                  </ItemDetails>
                </CartCardItem>
              ))}
            </div>

            <CartItemSumary>
              <tbody>
                <tr>
                  <td>Quantidade</td>
                  <td>
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Valor Total</td>
                  <td>{formattedTotalPrice}</td>
                </tr>
              </tfoot>
            </CartItemSumary>
            <Button
              onClick={handleBuyProduct}
              disabled={isCreatingCheckoutSession}>
              Finalizar compra
            </Button>
          </CartContent>
          <Overlay />
        </>
      )}
    </CartContainer>
  );
}

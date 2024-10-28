'use client';

import React, { useCallback } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { CartItem, getItem, inStock } from './cart.utils';
import { useLocalStorage } from '@utils/use-local-storage';
interface CartProviderState extends State {
  addItemToCart: (item: CartItem, quantity: number) => void;
  removeItemFromCart: (id: CartItem['id']) => void;
  clearItemFromCart: (id: CartItem['id']) => void;
  getItemFromCart: (id: CartItem['id']) => any | undefined;
  isInCart: (id: CartItem['id']) => boolean;
  isInStock: (id: CartItem['id']) => boolean;
  resetCart: () => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined,
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export function CartProvider(props: React.PropsWithChildren<any>) {
  const [savedCart, saveCart] = useLocalStorage(
    `borobazar-cart`,
    JSON.stringify(initialState),
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!),
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: CartItem, quantity: number) => {
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  }

  const removeItemFromCart = (id: CartItem['id']) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id });
  const clearItemFromCart = (id: CartItem['id']) =>
    dispatch({ type: 'REMOVE_ITEM', id });
  const isInCart = useCallback(
    (id: CartItem['id']) => !!getItem(state.items, id),
    [state.items],
  );
  const getItemFromCart = useCallback(
    (id: CartItem['id']) => getItem(state.items, id),
    [state.items],
  );
  const isInStock = useCallback(
    (id: CartItem['id']) => inStock(state.items, id),
    [state.items],
  );
  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
    }),
    [getItemFromCart, isInCart, isInStock, state],
  );
  return <cartContext.Provider value={value} {...props} />;
}

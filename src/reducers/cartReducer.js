import { nanoid } from '@reduxjs/toolkit';
import { ADD_CART_ITEM, UPDATE_CART_ITEM_PRICE, DELETE_CART_ITEM } from '../actions/actionTypes';

const INITIAL_STATE = {
  cartItems: [],
};

export default function cartReducer(state = INITIAL_STATE, action) {
  const a = action.payload;
  let existing = false;
  let result = [];
  switch (action.type) {
    case ADD_CART_ITEM:
      result = state.cartItems.map((i) => {
        if (i.id === a.id && i.size === a.size) {
          existing = true;
          return { ...i, quantity: i.quantity + a.quantity, total: i.total + a.quantity * a.price };
        }
        return i;
      });
      if (!existing) {
        result.push({
          cartItemId: nanoid(),
          title: a.title,
          size: a.size,
          price: a.price,
          quantity: a.quantity,
          total: a.price * a.quantity,
        });
      }
      return { cartItems: result };

    case DELETE_CART_ITEM:
      return { cartItems: state.cartItems.filter((i) => i.cartItemId !== a.cartItemId) };

    case UPDATE_CART_ITEM_PRICE:
      return {
        cartItems: state.cartItems.map((i) => ((i.cartItemId === a.cartItemId)
          ? { ...i, total: i.quantity * a.price, price: a.price } : i)),
      };

    default:
      return state;
  }
}

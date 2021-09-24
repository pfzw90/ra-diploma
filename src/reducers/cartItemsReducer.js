import { nanoid } from '@reduxjs/toolkit';
import {
  ADD_CART_ITEM, TOGGLE_DELETE_CART_ITEM,
  REMOVE_DELETED, CHECK_PRICES, SEND_ORDER,
} from '../actions/actionTypes';

const INITIAL_STATE = [];

export default function cartItemsReducer(state = INITIAL_STATE, action) {
  const a = action.payload;
  let existing = false;
  let result = [];

  switch (action.type) {
    case ADD_CART_ITEM:

      result = state.map((i) => {
        if (i.id === a.id && i.size === a.size) {
          existing = true;
          return {
            ...i,
            quantity: i.quantity + a.quantity,
            price: a.price,
          };
        }
        return i;
      });

      if (!existing) {
        result.push({
          cartItemId: nanoid(),
          title: a.title,
          size: a.size,
          price: a.price,
          newPrice: a.price,
          quantity: a.quantity,
          id: a.id,
          delete: false,
        });
      }
      return result;

    case TOGGLE_DELETE_CART_ITEM:
      return state.map((i) => {
        if (i.id === a) {
          return { ...i, delete: !i.delete };
        }
        return i;
      });

    case REMOVE_DELETED: {
      return state.filter((i) => (i.delete === false));
    }

    case CHECK_PRICES: {
      return (a.data) ? state.map((i) => (
        { ...i, newPrice: a.data.find((d) => d.id === i.id).price }
      )) : state;
    }

    case SEND_ORDER: {
      if (action.payload === 'idle') return INITIAL_STATE;
      return state;
    }

    default:
      return state;
  }
}

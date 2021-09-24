import {
  COUNT_CART_SUM,
  CHECK_PRICES,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  cartState: 'idle',
  cartSum: 0,
};

export default function cartReducer(state = INITIAL_STATE, action) {
  const a = action.payload;

  switch (action.type) {
    case COUNT_CART_SUM:
      return {
        ...state,
        cartSum: a.items.filter((i) => (i.delete !== true)).reduce(
          (s, i) => s + i.newPrice * i.quantity, 0,
        ),
      };

    case CHECK_PRICES: {
      return {
        ...state,
        cartState: a.cartState,
      };
    }

    default:
      return state;
  }
}

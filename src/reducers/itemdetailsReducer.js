import {
  ADD_CART_TOOLTIP, CHANGE_QUANTITY, GET_ITEM_DETAILS, SELECT_SIZE,
} from '../actions/actionTypes';

const initialState = {
  itemState: 'loading',
  itemData: [],
  selectedSize: null,
  selectedQuantity: 1,
  avaliableSizes: [],
};

export default function itemDetailsReducer(state = initialState, action) {
  const avaliableSizes = [];
  switch (action.type) {
    case GET_ITEM_DETAILS:
      if (action.payload.data) {
        action.payload.data.sizes.forEach((s) => {
          if (s.avalible) avaliableSizes.push(s.size);
        });
      }
      return {
        ...initialState,
        itemState: action.payload.itemState,
        itemData: action.payload.data || [],
        avaliableSizes,
        selectedSize: avaliableSizes.length ? avaliableSizes[0] : null,
      };

    case SELECT_SIZE:
      return {
        ...state,
        selectedSize: action.payload,
      };

    case CHANGE_QUANTITY:
      if (action.payload === 'inc') {
        return {
          ...state,
          selectedQuantity: state.selectedQuantity + 1,
        };
      }
      if (action.payload === 'dec') {
        return {
          ...state,
          selectedQuantity: state.selectedQuantity - 1,
        };
      }
      return {
        ...state,
        selectedQuantity: 1,
      };

    case ADD_CART_TOOLTIP:
      return {
        ...state,
        itemState: action.payload,
      };

    default:
      return state;
  }
}

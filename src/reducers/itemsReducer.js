import { GET_ITEMS, RESET_ITEMS } from '../actions/actionTypes';

const initialState = {
  itemsState: 'loading',
  itemsList: [],
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        itemsState: action.payload.itemsState,
        itemsList: action.payload.data
          ? state.itemsList.concat(action.payload.data) : state.itemsList,
      };

    case RESET_ITEMS:
      return {
        ...state,
        itemsList: initialState.itemsList,
      };

    default:
      return state;
  }
}

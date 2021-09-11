import { GET_ITEMS, RESET_ITEMS } from '../actions/actionTypes';

const initialState = {
  itemsState: 'loading',
  itemsList: [],
  lastFetched: true,
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        itemsState: action.payload.itemsState,
        itemsList: action.payload.data
          ? state.itemsList.concat(action.payload.data) : state.itemsList,
        lastFetched: !!(action.payload.data && action.payload.data.length),
      };

    case RESET_ITEMS:
      return {
        ...state,
        itemsList: initialState.itemsList,
        lastFetched: initialState.lastFetched,
      };

    default:
      return state;
  }
}

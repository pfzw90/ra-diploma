import { GET_ITEMS, RESET_ITEMS } from '../actions/actionTypes';

const initialState = {
  itemsState: 'loading',
  itemsList: [],
  lastFetched: false,
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      if (action.payload.data) console.log(action.payload.data.length);
      return {
        itemsState: action.payload.itemsState,
        itemsList: action.payload.data
          ? state.itemsList.concat(action.payload.data) : state.itemsList,
        lastFetched: (action.payload.itemsState === 'idle') ? (action.payload.data.length > 0) : state.lastFetched,
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

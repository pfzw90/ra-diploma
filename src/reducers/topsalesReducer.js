import { GET_TOP_SALES } from '../actions/actionTypes';

const initialState = {
  topsalesState: 'idle',
  topsalesList: [],
};

export default function topSalesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TOP_SALES:
      return {
        topsalesState: action.payload.topsalesState,
        topsalesList: action.payload.data || [],
      };

    default:
      return state;
  }
}

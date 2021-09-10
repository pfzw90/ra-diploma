import { CHANGE_SEARCH, TOGGLE_SEARCH_OPACITY } from '../actions/actionTypes';

const initialState = {
  value: '',
  hidden: true,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH:
      return { ...state, value: action.payload };
    case TOGGLE_SEARCH_OPACITY:
      return { ...state, hidden: !state.hidden };
    default:
      return state;
  }
}

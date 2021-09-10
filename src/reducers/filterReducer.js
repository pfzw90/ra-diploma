import {
  CHANGE_CATEGORY, INIT_SEARCH, RESET_CATEGORY, RESET_QUERY, SET_OFFSET, RESET_OFFSET,
} from '../actions/actionTypes';

const initialState = {
  q: null,
  categoryId: null,
  offset: null,
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return { ...state, categoryId: action.payload };
    case RESET_CATEGORY:
      return { ...state, categoryId: initialState.categoryId };
    case SET_OFFSET:
      return { ...state, offset: state.offset + action.payload };
    case RESET_OFFSET:
      return { ...state, offset: initialState.offset };
    case INIT_SEARCH:
      return { ...state, q: action.payload };
    case RESET_QUERY:
      return { ...state, q: initialState.q };
    default:
      return state;
  }
}

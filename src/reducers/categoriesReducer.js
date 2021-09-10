import { GET_CATEGORIES } from '../actions/actionTypes';

const initialState = {
  categoriesState: 'idle',
  categoriesList: [],
};

export default function CategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        categoriesState: action.payload.categoriesState,
        categoriesList: action.payload.data || [],
      };

    default:
      return state;
  }
}

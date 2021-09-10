import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CategoriesReducer from '../reducers/categoriesReducer';
import filterReducer from '../reducers/filterReducer';
import itemDetailsReducer from '../reducers/itemdetailsReducer';
import itemsReducer from '../reducers/itemsReducer';
import SearchReducer from '../reducers/searchReducer';
import topSalesReducer from '../reducers/topsalesReducer';

const reducer = combineReducers({
  search: SearchReducer,
  categories: CategoriesReducer,
  filter: filterReducer,
  topsales: topSalesReducer,
  item: itemDetailsReducer,
  items: itemsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

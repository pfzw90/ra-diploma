import {
  CHANGE_SEARCH, TOGGLE_SEARCH_OPACITY, GET_ITEMS,
  GET_CATEGORIES, CHANGE_CATEGORY, RESET_CATEGORY, RESET_QUERY, INIT_SEARCH,
  GET_TOP_SALES, GET_ITEM_DETAILS, SELECT_SIZE, CHANGE_QUANTITY, SET_OFFSET,
  RESET_OFFSET, RESET_ITEMS,
} from './actionTypes';

export function changeSearch(value) {
  return { type: CHANGE_SEARCH, payload: value };
}

export function initSearch(query) {
  return { type: INIT_SEARCH, payload: query };
}
export function toggleSearchOpacity() {
  return { type: TOGGLE_SEARCH_OPACITY, payload: {} };
}

export function changeCategory(id) {
  return { type: CHANGE_CATEGORY, payload: id };
}

export function resetCategory() {
  return { type: RESET_CATEGORY };
}

export function resetQuery() {
  return { type: RESET_QUERY };
}

export function resetOffset() {
  return { type: RESET_OFFSET };
}

export function resetItems() {
  return { type: RESET_ITEMS };
}

export function setOffset(number) {
  return { type: SET_OFFSET, payload: number };
}

export function getItems(itemsState = 'idle', data = null) {
  return { type: GET_ITEMS, payload: { itemsState, data } };
}

export function getTopSales(topsalesState = 'idle', data = null) {
  return { type: GET_TOP_SALES, payload: { topsalesState, data } };
}

export function getCategories(categoriesState = 'idle', data = null) {
  return { type: GET_CATEGORIES, payload: { categoriesState, data } };
}

export function getItemDetails(itemState = 'idle', data = null) {
  return { type: GET_ITEM_DETAILS, payload: { itemState, data } };
}

export function selectSize(size = null) {
  return { type: SELECT_SIZE, payload: size };
}

export function changeQuantity(inc = true) {
  return { type: CHANGE_QUANTITY, payload: inc };
}

export const fetchData = (url, fn, params) => async (dispatch) => {
  dispatch(fn('loading'));
  try {
    const response = await fetch(url + ((params) ? `?${new URLSearchParams(params)}` : ''));
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fn('idle', data));
    if (params) dispatch(setOffset(data.length));
  } catch (e) {
    dispatch(fn(`error: ${e.message}`));
  }
};

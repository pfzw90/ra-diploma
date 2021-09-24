import {
  CHANGE_SEARCH, TOGGLE_SEARCH_OPACITY, GET_ITEMS,
  GET_CATEGORIES, CHANGE_CATEGORY, RESET_CATEGORY, RESET_QUERY, INIT_SEARCH,
  GET_TOP_SALES, GET_ITEM_DETAILS, SELECT_SIZE, CHANGE_QUANTITY, SET_OFFSET,
  RESET_OFFSET, RESET_ITEMS, ADD_CART_ITEM, ADD_CART_TOOLTIP, TOGGLE_DELETE_CART_ITEM,
  COUNT_CART_SUM, REMOVE_DELETED, CHECK_PRICES, CHANGE_ORDER_FORM, CHECK_PHONE, CHECK_ADDRESS,
  SEND_ORDER,
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

export function addCartItem(item) {
  return { type: ADD_CART_ITEM, payload: item };
}

export function toggleDeleteCartItem(id) {
  return { type: TOGGLE_DELETE_CART_ITEM, payload: id };
}

export function addCartTooltip(state) {
  return { type: ADD_CART_TOOLTIP, payload: state };
}

export function countCartSum(items) {
  return { type: COUNT_CART_SUM, payload: { items } };
}

export function removeDeleted() {
  return { type: REMOVE_DELETED };
}

export function checkPrices(cartState = 'idle', data = null) {
  return { type: CHECK_PRICES, payload: { cartState, data } };
}

export function changeOrderForm(id, value) {
  return { type: CHANGE_ORDER_FORM, payload: { id, value } };
}

export function checkPhone(value) {
  return { type: CHECK_PHONE, payload: value };
}

export function checkAddress(value) {
  return { type: CHECK_ADDRESS, payload: value };
}

export function sendOrder(orderFormState) {
  return { type: SEND_ORDER, payload: orderFormState };
}

export const fetchData = (url, fn, params) => async (dispatch) => {
  dispatch(fn('loading'));
  try {
    const response = await fetch(url + ((params) ? `?${new URLSearchParams(params)}` : ''), { method: 'GET' });
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

export const fetchPrices = (items) => async (dispatch) => {
  dispatch(checkPrices('loading'));
  try {
    const data = await Promise.all(items.map(async (i) => {
      const response = await fetch(`${process.env.REACT_APP_ITEMS_URL}/${i.id}`, { method: 'GET' });
      const result = await response.json();
      return result;
    }));
    dispatch(checkPrices('idle', data));
  } catch (e) {
    dispatch(checkPrices(`error: ${e.message}`));
  }
};

export const addToCart = (item) => async (dispatch) => {
  dispatch(addCartItem(item));
  dispatch(addCartTooltip('additem'));
  setTimeout(() => dispatch(addCartTooltip('idle')), 700);
};

export const sendOrderRequest = (order) => async (dispatch) => {
  dispatch(sendOrder('loading'));
  try {
    const response = await fetch(process.env.REACT_APP_ORDER_URL, { method: 'POST', body: JSON.stringify(order), mode: 'no-cors' });
    if (!response.status === 200) {
      throw new Error(response.statusText);
    }
    dispatch(sendOrder('success'));
    setTimeout(() => dispatch(sendOrder('idle')), 3000);
  } catch (e) {
    dispatch(sendOrder(`error: ${e.message}`));
  }
};

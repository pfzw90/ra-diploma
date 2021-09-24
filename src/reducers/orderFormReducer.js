import {
  CHANGE_ORDER_FORM, CHECK_ADDRESS, CHECK_PHONE, SEND_ORDER,
} from '../actions/actionTypes';

const initialState = {
  orderFormState: 'idle',
  address: { value: '', error: null },
  phone: { value: '', error: null },
  agreement: false,
};

export default function orderFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ORDER_FORM:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], value: action.payload.value },
      };
    case CHECK_ADDRESS:
      return {
        ...state,
        address: { ...state.address, error: action.payload.length < 10 },
      };

    case CHECK_PHONE:
      return {
        ...state,
        phone: { ...state.phone, error: !(/^((\+7|7|8)+([0-9]){10})$/gm).test(action.payload) },
      };

    case SEND_ORDER:
      if (action.payload === 'idle') { return initialState; }
      return {
        ...state,
        orderFormState: action.payload,
      };

    default:
      return state;
  }
}

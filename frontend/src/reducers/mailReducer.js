import {
  MAIL_SUCCESS,
  MAIL_REQUEST,
  MAIL_FAIL,
  CLEAR_ERRORS,
} from "../constants/mailConstants";

export const mailReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case MAIL_REQUEST:
      return {
        loading: true,
      };
    case MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case MAIL_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

import { postHttp } from "../config/app";

import {
  MAIL_REQUEST,
  MAIL_SUCCESS,
  MAIL_FAIL,
  CLEAR_ERRORS,
} from "../constants/mailConstants";

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const sendMail = (formData) => async (dispatch) => {
  try {
    dispatch({ type: MAIL_REQUEST });

    const data = await postHttp(`sendMail`, formData);

    dispatch({
      type: MAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

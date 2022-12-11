import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

import {
  ALL_ACTIVITY_REQUEST,
  ALL_ACTIVITY_SUCCESS,
  ALL_ACTIVITY_FAIL,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAIL,
  NEW_ACTIVITY_REQUEST,
  NEW_ACTIVITY_SUCCESS,
  NEW_ACTIVITY_FAIL,
  UPDATE_ACTIVITY_REQUEST,
  UPDATE_ACTIVITY_SUCCESS,
  UPDATE_ACTIVITY_FAIL,
  DELETE_ACTIVITY_REQUEST,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAIL,
  CLEAR_ERRORS,
} from "../constants/businessActivityConstants";

const page = "activities";

export const getAllActivity =
  (keyword = "", resPerPage = 10, currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ACTIVITY_REQUEST });
      let url =
        page +
        `?keyword=${keyword}&page=${currentPage}&resPerPage=${resPerPage}`;
      const data = await getHttp(url);

      dispatch({
        type: ALL_ACTIVITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ACTIVITY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const fetch = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ACTIVITY_REQUEST });

    //    const { data } = await axios.get(`${config.API_URL}/api/v1/${page}/${id}`);
    const data = await getHttp(`${page}/${id}`);

    dispatch({
      type: GET_ACTIVITY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACTIVITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const create = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ACTIVITY_REQUEST });

    const data = await postHttp(`${page}`, packageData);

    dispatch({
      type: NEW_ACTIVITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ACTIVITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const remove = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ACTIVITY_REQUEST });
    const data = await deleteHttp(`${page}/${id}`);

    dispatch({
      type: DELETE_ACTIVITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ACTIVITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const update = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ACTIVITY_REQUEST });

    const data = await putHttp(`${page}/${id}`, formData);

    dispatch({
      type: UPDATE_ACTIVITY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ACTIVITY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

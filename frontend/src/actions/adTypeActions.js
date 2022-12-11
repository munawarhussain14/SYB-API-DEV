import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

import {
  ALL_ADTYPE_REQUEST,
  ALL_ADTYPE_SUCCESS,
  ALL_ADTYPE_FAIL,
  NEW_ADTYPE_REQUEST,
  NEW_ADTYPE_SUCCESS,
  NEW_ADTYPE_FAIL,
  GET_ADTYPE_REQUEST,
  GET_ADTYPE_SUCCESS,
  GET_ADTYPE_FAIL,
  UPDATE_ADTYPE_REQUEST,
  UPDATE_ADTYPE_SUCCESS,
  UPDATE_ADTYPE_FAIL,
  DELETE_ADTYPE_REQUEST,
  DELETE_ADTYPE_SUCCESS,
  DELETE_ADTYPE_FAIL,
  CLEAR_ERRORS,
} from "../constants/adClassConstants";

const page = "adtypes";

export const getAll =
  (keyword = null, adPage = null, currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ADTYPE_REQUEST });

      /*const { data } = await axios.get(
        `${config.API_URL}/api/v1/${page}?${
          keyword ? "keyword=" + keyword : ""
        }&page=${currentPage}${adPage ? "&adPage=" + adPage : ""}`
      );*/

      const data = await getHttp(
        `${page}?${keyword ? "keyword=" + keyword : ""}&page=${currentPage}${
          adPage ? "&adPage=" + adPage : ""
        }`
      );

      dispatch({
        type: ALL_ADTYPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ADTYPE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const fetch = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADTYPE_REQUEST });

    // const { data } = await axios.get(`${config.API_URL}/api/v1/${page}/${id}`);

    const data = await getHttp(`${page}/${id}`);

    dispatch({
      type: GET_ADTYPE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADTYPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const create = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ADTYPE_REQUEST });
    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${config.API_URL}/api/v1/${page}`,
      packageData,
      configs
    );*/

    const data = await postHttp(`${page}`, packageData);

    dispatch({
      type: NEW_ADTYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADTYPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const remove = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADTYPE_REQUEST });

    const data = await deleteHttp(`${page}/${id}`);

    dispatch({
      type: DELETE_ADTYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADTYPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const update = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADTYPE_REQUEST });

    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${config.API_URL}/api/v1/${page}/${id}`,
      formData,
      configs
    );*/

    const data = await putHttp(`${page}/${id}`, formData);

    dispatch({
      type: UPDATE_ADTYPE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADTYPE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

import {
  ALL_ADVERTISEMENTS_REQUEST,
  ALL_ADVERTISEMENTS_SUCCESS,
  ALL_ADVERTISEMENTS_FAIL,
  NEW_ADVERTISEMENT_REQUEST,
  NEW_ADVERTISEMENT_SUCCESS,
  NEW_ADVERTISEMENT_FAIL,
  GET_ADVERTISEMENT_REQUEST,
  GET_ADVERTISEMENT_SUCCESS,
  GET_ADVERTISEMENT_FAIL,
  UPDATE_ADVERTISEMENT_REQUEST,
  UPDATE_ADVERTISEMENT_SUCCESS,
  UPDATE_ADVERTISEMENT_FAIL,
  DELETE_ADVERTISEMENT_REQUEST,
  DELETE_ADVERTISEMENT_SUCCESS,
  DELETE_ADVERTISEMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/advertisementConstants";
const route = "advertisements";

export const remove = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADVERTISEMENT_REQUEST });

    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `${config.API_URL}/api/v1/${route}/${id}`
    );*/

    const data = await deleteHttp(`${route}/${id}`);

    dispatch({
      type: DELETE_ADVERTISEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADVERTISEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAll =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ADVERTISEMENTS_REQUEST });
      /*
      const { data } = await axios.get(
        `${config.API_URL}/api/v1/${route}?${
          keyword ? `keyword=${keyword}` : ""
        }${keyword ? `&page=${currentPage}` : ""}`
      );*/
      let condition = "";
      if (keyword) {
        condition += `?keyword=${keyword}`;
      }
      if (currentPage) {
        if (condition == "") condition = "?";
        else condition += "&";
        condition += `page=${currentPage}`;
      }

      const data = await getHttp(`${route}${condition}`);

      dispatch({
        type: ALL_ADVERTISEMENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ADVERTISEMENTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const fetch = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADVERTISEMENT_REQUEST });

    // const { data } = await axios.get(`${config.API_URL}/api/v1/${route}/${id}`);
    const data = await getHttp(`${route}/${id}`);

    dispatch({
      type: GET_ADVERTISEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADVERTISEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const create = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ADVERTISEMENT_REQUEST });
    /*
    const configs = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${config.API_URL}/api/v1/${route}`,
      formData,
      configs
    );*/

    const data = await postHttp(`${route}`, formData, "multipart/form-data");

    dispatch({
      type: NEW_ADVERTISEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADVERTISEMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const update = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADVERTISEMENT_REQUEST });
    /*
    const configs = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `${config.API_URL}/api/v1/${route}/${id}`,
      formData,
      configs
    );*/

    const data = await putHttp(
      `${route}/${id}`,
      formData,
      "multipart/form-data"
    );

    dispatch({
      type: UPDATE_ADVERTISEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADVERTISEMENT_FAIL,
      payload: error.response.data,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

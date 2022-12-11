import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

import {
  ALL_ADCLASS_REQUEST,
  ALL_ADCLASS_SUCCESS,
  ALL_ADCLASS_FAIL,
  NEW_ADCLASS_REQUEST,
  NEW_ADCLASS_SUCCESS,
  NEW_ADCLASS_FAIL,
  GET_ADCLASS_REQUEST,
  GET_ADCLASS_SUCCESS,
  GET_ADCLASS_FAIL,
  UPDATE_ADCLASS_REQUEST,
  UPDATE_ADCLASS_SUCCESS,
  UPDATE_ADCLASS_FAIL,
  DELETE_ADCLASS_REQUEST,
  DELETE_ADCLASS_SUCCESS,
  DELETE_ADCLASS_FAIL,
  CLEAR_ERRORS,
} from "../constants/adClassConstants";

const page = "adClasses";

export const getAll =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ADCLASS_REQUEST });

      /*
      const { data } = await axios.get(
        `${config.API_URL}/api/v1/${page}?keyword=${keyword}&page=${currentPage}`
      );*/

      const data = await getHttp(
        `${page}?keyword=${keyword}&page=${currentPage}`
      );

      dispatch({
        type: ALL_ADCLASS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ADCLASS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const fetch = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADCLASS_REQUEST });

    //    const { data } = await axios.get(`${config.API_URL}/api/v1/${page}/${id}`);
    const data = await getHttp(`${page}/${id}`);

    dispatch({
      type: GET_ADCLASS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADCLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const create = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ADCLASS_REQUEST });
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
      type: NEW_ADCLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADCLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const remove = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADCLASS_REQUEST });
    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `${config.API_URL}/api/v1/${page}/${id}`
    );*/

    const data = await deleteHttp(`${page}/${id}`);

    dispatch({
      type: DELETE_ADCLASS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADCLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const update = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADCLASS_REQUEST });
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
      );
    */

    const data = await putHttp(`${page}/${id}`, formData);

    dispatch({
      type: UPDATE_ADCLASS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADCLASS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

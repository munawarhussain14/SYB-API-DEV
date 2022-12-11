import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

import {
  ALL_QUERIES_REQUEST,
  ALL_QUERIES_SUCCESS,
  ALL_QUERIES_FAIL,
  NEW_QUERY_REQUEST,
  NEW_QUERY_SUCCESS,
  NEW_QUERY_FAIL,
  GET_QUERY_REQUEST,
  GET_QUERY_SUCCESS,
  GET_QUERY_FAIL,
  UPDATE_QUERY_REQUEST,
  UPDATE_QUERY_SUCCESS,
  UPDATE_QUERY_FAIL,
  CLEAR_ERRORS,
  DELETE_QUERY_REQUEST,
  DELETE_QUERY_SUCCESS,
  DELETE_QUERY_FAIL,
} from "../constants/queryConstants";

export const getQueries =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_QUERIES_REQUEST });

      const data = await getHttp(
        `queries?keyword=${keyword}&page=${currentPage}`
      );

      dispatch({
        type: ALL_QUERIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_QUERIES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getQuery = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_QUERY_REQUEST });

    //const { data } = await axios.get(`${config.API_URL}/api/v1/queries/${id}`);
    const data = await getHttp(`queries/${id}`);

    dispatch({
      type: GET_QUERY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUERY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newQuery = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_QUERY_REQUEST });
    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${config.API_URL}/api/v1/queries`,
      packageData,
      configs
    );*/

    const data = await postHttp(`queries`, packageData);

    dispatch({
      type: NEW_QUERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_QUERY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteQuery = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_QUERY_REQUEST });
    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `${config.API_URL}/api/v1/queries/${id}`
    );*/

    const data = await deleteHttp(`queries/${id}`);

    dispatch({
      type: DELETE_QUERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_QUERY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateQuery = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUERY_REQUEST });
    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    

    const { data } = await axios.put(
      `${config.API_URL}/api/v1/queries/${packageData._id}`,
      packageData,
      configs
    );*/
    const data = await putHttp(`queries/${packageData._id}`, packageData);

    dispatch({
      type: UPDATE_QUERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_QUERY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

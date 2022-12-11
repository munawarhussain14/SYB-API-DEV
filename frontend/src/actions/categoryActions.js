import { getHttp, putHttp, postHttp } from "../config/app";
import {
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,
  GET_SUB_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryConstants";

export const getCategories =
  (keyword = "", currentPage = 1, resPerPage=10) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_CATEGORY_REQUEST });
      const data = await getHttp(
        `categories?keyword=${keyword}&page=${currentPage}&resPerPage=${resPerPage}`
      );

      dispatch({
        type: ALL_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });

    // const { data } = await axios.get(`${config.API_URL}/api/v1/category/${id}`);
    const data = await getHttp(`category/${id}`);
    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newCategory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });
    const data = await postHttp(`categories`, formData);

    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    const data = await putHttp(`category/${id}`, formData);

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPrentsCategories = async () => {
  try {
    const data = await getHttp(`categories?parent=null`);
    return data;
  } catch (error) {
    return {"status":"fail"};
  }
};

export const getSubCategories = (parent_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUB_CATEGORY_REQUEST });

    /*const { data } = await axios.get(
      `${config.API_URL}/api/v1/categories?parent=${parent_id}`
    );*/

    const data = await getHttp(`categories?parent=${parent_id}`);

    dispatch({
      type: GET_SUB_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUB_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

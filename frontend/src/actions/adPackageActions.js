import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

import {
  ALL_ADPACKAGES_REQUEST,
  ALL_ADPACKAGES_SUCCESS,
  ALL_ADPACKAGES_FAIL,
  NEW_ADPACKAGE_REQUEST,
  NEW_ADPACKAGE_SUCCESS,
  NEW_ADPACKAGE_FAIL,
  GET_ADPACKAGE_REQUEST,
  GET_ADPACKAGE_SUCCESS,
  GET_ADPACKAGE_FAIL,
  UPDATE_ADPACKAGE_REQUEST,
  UPDATE_ADPACKAGE_SUCCESS,
  UPDATE_ADPACKAGE_FAIL,
  CLEAR_ERRORS,
  DELETE_ADPACKAGE_REQUEST,
  DELETE_ADPACKAGE_SUCCESS,
  DELETE_ADPACKAGE_FAIL,
} from "../constants/adPackageConstants";

const route = "adpackages";

export const getAll =
  (state = { keyword: "", page: 1, adPage: null, country: null, type: null }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_ADPACKAGES_REQUEST });

      const data = await getHttp(
        `${route}?${state.keyword ? "keyword=" + state.keyword : ""}${
          state.page ? "&page=" + state.page : ""
        }${state.adPage ? "&adPage=" + state.adPage : ""}${
          state.type ? "&type=" + state.type : ""
        }${state.country ? "&country=" + state.country : ""}`
      );
      dispatch({
        type: ALL_ADPACKAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ADPACKAGES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const get = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ADPACKAGE_REQUEST });

    //const { data } = await axios.get(`${config.API_URL}/api/v1/${route}/${id}`);

    const data = await getHttp(`${route}/${id}`);

    dispatch({
      type: GET_ADPACKAGE_SUCCESS,
      payload: data.package,
    });
  } catch (error) {
    dispatch({
      type: GET_ADPACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const create = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ADPACKAGE_REQUEST });

    const data = await postHttp(`${route}`, packageData);

    dispatch({
      type: NEW_ADPACKAGE_SUCCESS,
      payload: data.package,
    });
  } catch (error) {
    dispatch({
      type: NEW_ADPACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const remove = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADPACKAGE_REQUEST });

    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await deleteHttp(`${route}/${id}`);

    dispatch({
      type: DELETE_ADPACKAGE_SUCCESS,
      payload: data.package,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADPACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const update = (id, packageData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADPACKAGE_REQUEST });

    const data = await putHttp(`${route}/${id}`, packageData);

    dispatch({
      type: UPDATE_ADPACKAGE_SUCCESS,
      payload: data.package,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADPACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

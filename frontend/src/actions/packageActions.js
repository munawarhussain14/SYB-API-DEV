import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

import {
  ALL_PACKAGES_REQUEST,
  ALL_PACKAGES_SUCCESS,
  ALL_PACKAGES_FAIL,
  NEW_PACKAGE_REQUEST,
  NEW_PACKAGE_SUCCESS,
  NEW_PACKAGE_FAIL,
  GET_PACKAGE_REQUEST,
  GET_PACKAGE_SUCCESS,
  GET_PACKAGE_FAIL,
  UPDATE_PACKAGE_REQUEST,
  UPDATE_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_FAIL,
  CLEAR_ERRORS,
  DELETE_PACKAGE_REQUEST,
  DELETE_PACKAGE_SUCCESS,
  DELETE_PACKAGE_FAIL,
} from "../constants/packageConstants";

export const getPackages =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PACKAGES_REQUEST });

      /*const { data } = await axios.get(
        `${config.API_URL}/api/v1/packages?keyword=${keyword}&page=${currentPage}`
      );*/

      const data = await getHttp(
        `packages?keyword=${keyword}&page=${currentPage}`
      );

      dispatch({
        type: ALL_PACKAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PACKAGES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getPackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PACKAGE_REQUEST });

    // const { data } = await axios.get(`${config.API_URL}/api/v1/package/${id}`);
    const data = await getHttp(`package/${id}`);

    dispatch({
      type: GET_PACKAGE_SUCCESS,
      payload: data.package,
    });
  } catch (error) {
    dispatch({
      type: GET_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newPackage = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PACKAGE_REQUEST });
    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${config.API_URL}/api/v1/packages`,
      packageData,
      configs
    );*/

    const data = await postHttp(`packages`, packageData);

    dispatch({
      type: NEW_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletePackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PACKAGE_REQUEST });

    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    const { data } = await axios.delete(
      `${config.API_URL}/api/v1/package/${id}`
      );*/

    const data = await deleteHttp(`package/${id}`);

    dispatch({
      type: DELETE_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePackage = (packageData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PACKAGE_REQUEST });
    const data = await putHttp(`package/${packageData._id}`, packageData);

    dispatch({
      type: UPDATE_PACKAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

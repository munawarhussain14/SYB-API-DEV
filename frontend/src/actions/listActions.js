import { deleteHttp, getHttp, putHttp } from "../config/app";

import {
  ADMIN_LISTS_SUCCESS,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAIL,
  ALL_LISTS_REQUEST,
  ALL_LISTS_SUCCESS,
  ADMIN_LISTS_REQUEST,
  ALL_LISTS_FAIL,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
  LIST_DETAILS_FAIL,
  LIST_DELETE_REQUEST,
  LIST_DELETE_SUCCESS,
  LIST_DELETE_FAIL,
  LIST_STATUS_REQUEST,
  LIST_STATUS_SUCCESS,
  LIST_STATUS_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAIL,
  CLEAR_ERRORS,
} from "../constants/listConstants";

export const getLists =
  (keyword = "", currentPage = 1, params = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_LISTS_REQUEST });

      if (params != "") {
        params = "&" + params;
      }

      const data = await getHttp(
        `lists?keyword=${keyword}&page=${currentPage}${params || ""}`
      );

      dispatch({
        type: ALL_LISTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_LISTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getUserLists =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_LISTS_REQUEST });

      /*const { data } = await axios.get(
        `${config.API_URL}/api/v1/lists?keyword=${keyword}&page=${currentPage}`
      );*/

      const data = await getHttp(
        `lists?keyword=${keyword}&page=${currentPage}`
      );

      dispatch({
        type: ALL_LISTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_LISTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getList = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIST_DETAILS_REQUEST });

    //    const { data } = await axios.get(`${config.API_URL}/api/v1/list/${id}`);

    const data = await getHttp(`admin/list/${id}`);

    dispatch({
      type: LIST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getAdminLists =
  (status = "all", keyword = "", currentPage = 1, condition = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADMIN_LISTS_REQUEST });
      let where = `&type=${status}`;

      for (const ele in condition) {
        where += `&${ele}=${condition[ele]}`;
      }

      const data = await getHttp(
        `admin/lists?keyword=${keyword}&page=${currentPage}${where}`
      );

      dispatch({
        type: ADMIN_LISTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_LISTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateList = (id, listData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LIST_REQUEST });

    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${config.API_URL}/api/v1/admin/list/${id}`,
      listData,
      configs
    );*/

    const data = await putHttp(`admin/list/${id}`, listData);

    dispatch({
      type: UPDATE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteImage = (id, image_id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_IMAGE_REQUEST });

    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `${config.API_URL}/api/v1/admin/list/deleteImage/${id}/${image_id}`
    );*/

    const data = await deleteHttp(`admin/list/deleteImage/${id}/${image_id}`);

    dispatch({
      type: DELETE_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const uploadImage = (id, listData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const data = await putHttp(
      `admin/list/upload/${id}`,
      listData,
      "multipart/form-data"
    );

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const uploadImages = async (id, listData, config = {}) => {
  try {
    console.log("Upload Images");
    const data = await putHttp(
      `admin/list/upload/${id}`,
      listData,
      "multipart/form-data",
      config
    );
    return data;
  } catch (error) {}
};

export const uploadCropImage = (id, image_id, listData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const data = await putHttp(
      `admin/list/uploadCropImage/${id}/${image_id}`,
      listData,
      "multipart/form-data"
    );

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteList = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIST_DELETE_REQUEST });

    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // const { data } = await axios.delete(`${config.API_URL}/api/v1/list/${id}`);

    const data = await deleteHttp(`list/${id}`);

    dispatch({
      type: LIST_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const approveList = (id, listData) => async (dispatch) => {
  try {
    dispatch({ type: LIST_STATUS_REQUEST });

    /*
    const configs = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${config.API_URL}/api/v1/admin/list/${id}`,
      listData,
      configs
    );*/

    const data = await putHttp(`admin/list/${id}`);

    dispatch({
      type: LIST_STATUS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: LIST_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

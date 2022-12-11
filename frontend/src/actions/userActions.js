import axios from "axios";
import { postHttp, getHttp } from "../config/app";
import Cookies from "universal-cookie";

import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  DETAIL_USER_REQUEST,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import API from "../config.json";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    /*
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API.API_URL}/api/v1/login`,
      { email, password },
      config
    );*/
    const data = await postHttp("login", { email, password });
    const cookies = new Cookies();
    cookies.set("token", data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API.API_URL}register`,
      userData,
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    /*
    const cookies = new Cookies();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("token"),
      },
    };
    const { data } = await axios.get(`${API.API_URL}/api/v1/me`, config);*/

    const data = await getHttp("me");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadDetail =
  (id = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DETAIL_USER_REQUEST });
      /*const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${API.API_URL}/api/v1/admin/user/${id}`,
        config
      );*/
      const data = await getHttp(`admin/user/${id}`);
      dispatch({
        type: DETAIL_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const cookies = new Cookies();
    cookies.remove("token");
    //const { data } = await axios.get(`${API.API_URL}/api/v1/logout`);
    const data = await getHttp(`logout`);

    dispatch({
      type: LOGOUT_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUsers =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });

      /*const { data } = await axios.get(
        `${API.API_URL}/api/v1/admin/users?keyword=${keyword}&page=${currentPage}`
      );*/

      const data = await getHttp(
        `admin/users?keyword=${keyword}&page=${currentPage}`
      );

      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_USERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

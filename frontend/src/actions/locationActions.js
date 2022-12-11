import { getHttp, postHttp, putHttp } from "../config/app";
import {
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_STATES_REQUEST,
  GET_STATES_SUCCESS,
  GET_STATES_FAIL,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
} from "../constants/locationConstants";

export const getCountries =
  (keyword = "", currentPage = 1, resPerPage = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_COUNTRIES_REQUEST });

      // const { data } = await axios.get(`${config.API_URL}/api/v1/countries`);
      const data = await getHttp(
        `countries?keyword=${keyword}&page=${currentPage}&resPerPage=${resPerPage}`
      );

      dispatch({
        type: GET_COUNTRIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COUNTRIES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getStates =
  (country_id = 0, keyword = "", currentPage = 1, resPerPage = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_STATES_REQUEST });

      let params = `keyword=${keyword}&page=${currentPage}&resPerPage=${resPerPage}`;
      if (country_id != 0) {
        params += `&country=${country_id}`;
      }

      const data = await getHttp(`states?${params}`);

      dispatch({
        type: GET_STATES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_STATES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getCities =
  (state_id = 0, keyword = "", currentPage = 1, resPerPage = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_CITIES_REQUEST });

      let params = `?keyword=${keyword}&page=${currentPage}&resPerPage=${resPerPage}`;
      if (state_id != 0) {
        params += `&state=${state_id}`;
      }
      const data = await getHttp(`cities${params}`);

      dispatch({
        type: GET_CITIES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CITIES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getCountriesList = async (
  keyword = "",
  currentPage = 1,
  resPerPage = 500
) => {
  try {
    const data = await getHttp(
      `countries?keyword=${keyword}&page=${currentPage}&resPerPage=${resPerPage}`
    );

    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const newCountry = async (formData) => {
  try {
    const data = await postHttp(`countries`, formData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCountry = async (id, formData) => {
  try {
    const data = await putHttp(`countries/${id}`, formData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCountry = async (country_id) => {
  try {
    const data = await getHttp(`countries/${country_id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getState = async (state) => {
  try {
    const data = await getHttp(`states/${state}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const newState = async (formData) => {
  try {
    const data = await postHttp(`states/new`, formData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateState = async (id, formData) => {
  try {
    const data = await putHttp(`states/${id}`, formData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getStatesList = async (country_id = 0) => {
  try {
    let params = ``;
    if (country_id != 0) {
      params += `?country=${country_id}`;
    }
    const data = await getHttp(`states${params}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCity = async (city) => {
  try {
    const data = await getHttp(`cities/${city}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const newCity = async (formData) => {
  try {
    const data = await postHttp(`cities/new`, formData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCity = async (id, formData) => {
  try {
    const data = await putHttp(`cities/${id}`, formData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
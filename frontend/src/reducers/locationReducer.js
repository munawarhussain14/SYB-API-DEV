import {
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAIL,
  GET_STATES_REQUEST,
  GET_STATES_SUCCESS,
  GET_STATES_FAIL,
  GET_STATES_RESET,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  GET_CITIES_RESET,
} from "../constants/locationConstants";

export const countriesReducer = (state = { countries: [] }, action) => {
  switch (action.type) {
    case GET_COUNTRIES_REQUEST:
      return {
        loading: true,
        count:0,
        total:0,
        resPerPage:0,
        countries: [],
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        loading: false,
        count: action.payload.count,
        total: action.payload.total,
        resPerPage: action.payload.resPerPage,
        countries: action.payload.data,
      };
    case GET_COUNTRIES_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const statesReducer = (state = { states: [] }, action) => {
  switch (action.type) {
    case GET_STATES_RESET:
      return {
        loading: false,
        count: 0,
        total: 0,
        resPerPage: 0,
        states: [],
      };
    case GET_STATES_REQUEST:
      return {
        loading: true,
        count: 0,
        total: 0,
        resPerPage: 0,
        states: [],
      };
    case GET_STATES_SUCCESS:
      return {
        loading: false,
        count: action.payload.count,
        total: action.payload.total,
        resPerPage: action.payload.resPerPage,
        states: action.payload.data,
      };
    case GET_STATES_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const citiesReducer = (state = { cities: [] }, action) => {
  switch (action.type) {
    case GET_CITIES_RESET:
      return {
        loading: false,
        count: 0,
        total: 0,
        resPerPage: 0,
        cities: [],
      };
    case GET_CITIES_REQUEST:
      return {
        loading: true,
        count: 0,
        total: 0,
        resPerPage: 0,
        cities: [],
      };
    case GET_CITIES_SUCCESS:
      return {
        loading: false,
        count: action.payload.count,
        total: action.payload.total,
        resPerPage: action.payload.resPerPage,
        cities: action.payload.data,
      };
    case GET_CITIES_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

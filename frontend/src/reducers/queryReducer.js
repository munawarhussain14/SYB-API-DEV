import {
  ALL_QUERIES_REQUEST,
  ALL_QUERIES_SUCCESS,
  UPDATE_QUERY_REQUEST,
  ALL_QUERIES_FAIL,
  ALL_QUERIES_RESET,
  NEW_QUERY_REQUEST,
  NEW_QUERY_SUCCESS,
  NEW_QUERY_FAIL,
  NEW_QUERY_RESET,
  GET_QUERY_REQUEST,
  GET_QUERY_SUCCESS,
  GET_QUERY_FAIL,
  GET_QUERY_RESET,
  CLEAR_ERRORS,
  DELETE_QUERY_REQUEST,
  DELETE_QUERY_SUCCESS,
  DELETE_QUERY_FAIL,
  RESET_QUERY_REQUEST,
} from "../constants/queryConstants";

export const queriesReducer = (state = { queries: [], total: 0 }, action) => {
  switch (action.type) {
    case ALL_QUERIES_REQUEST:
      return {
        loading: true,
        queries: [],
      };
    case DELETE_QUERY_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case ALL_QUERIES_SUCCESS:
      return {
        loading: false,
        queries: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case DELETE_QUERY_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        queries: [],
      };
    case ALL_QUERIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_QUERIES_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_QUERY_FAIL:
      return {
        loading: false,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const queryDetailReducer = (state = { query: {} }, action) => {
  switch (action.type) {
    case NEW_QUERY_REQUEST:
    case RESET_QUERY_REQUEST:
      return {
        loading: true,
        isCreated: false,
        query: null,
      };
    case GET_QUERY_REQUEST:
    case UPDATE_QUERY_REQUEST:
      return {
        loading: true,
        isLoaded: false,
        query: {},
      };

    case NEW_QUERY_SUCCESS:
      return {
        loading: true,
        isCreated: true,
        query: action.payload,
      };
    case GET_QUERY_SUCCESS:
      return {
        loading: false,
        isLoaded: true,
        query: action.payload,
      };
    case NEW_QUERY_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload,
      };

    case GET_QUERY_FAIL:
      return {
        loading: false,
        isLoaded: false,
        error: action.payload,
      };
    case NEW_QUERY_RESET:
    case GET_QUERY_RESET:
      return {
        loading: false,
        isLoaded: false,
        query: {},
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

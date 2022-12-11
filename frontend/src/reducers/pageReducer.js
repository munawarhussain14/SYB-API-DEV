import {
  ALL_PAGE_REQUEST,
  ALL_PAGE_SUCCESS,
  ALL_PAGE_FAIL,
  ALL_PAGE_RESET,
  NEW_PAGE_REQUEST,
  NEW_PAGE_SUCCESS,
  NEW_PAGE_RESET,
  NEW_PAGE_FAIL,
  GET_PAGE_REQUEST,
  GET_PAGE_SUCCESS,
  GET_PAGE_RESET,
  GET_PAGE_FAIL,
  UPDATE_PAGE_REQUEST,
  UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_RESET,
  UPDATE_PAGE_FAIL,
  RESET_PAGE_REQUEST,
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
  ALL_ADTYPE_REQUEST,
  ALL_ADTYPE_SUCCESS,
  ALL_ADTYPE_FAIL,
  ALL_ADTYPE_RESET,
  NEW_ADTYPE_REQUEST,
  NEW_ADTYPE_SUCCESS,
  NEW_ADTYPE_RESET,
  NEW_ADTYPE_FAIL,
  GET_ADTYPE_REQUEST,
  GET_ADTYPE_SUCCESS,
  GET_ADTYPE_RESET,
  GET_ADTYPE_FAIL,
  UPDATE_ADTYPE_REQUEST,
  UPDATE_ADTYPE_SUCCESS,
  UPDATE_ADTYPE_RESET,
  UPDATE_ADTYPE_FAIL,
  RESET_ADTYPE_REQUEST,
  DELETE_ADTYPE_REQUEST,
  DELETE_ADTYPE_SUCCESS,
  DELETE_ADTYPE_FAIL,
  CLEAR_ERRORS,
} from "../constants/pageConstants";

export const pagesReducer = (state = { pages: [], total: 0 }, action) => {
  switch (action.type) {
    case ALL_PAGE_REQUEST:
      return {
        loading: true,
        pages: [],
      };
    case DELETE_PAGE_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case ALL_PAGE_SUCCESS:
      return {
        loading: false,
        pages: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case DELETE_PAGE_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        pages: [],
      };
    case ALL_PAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_PAGE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_PAGE_FAIL:
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

export const pageReducer = (state = { page: null }, action) => {
  switch (action.type) {
    case NEW_PAGE_REQUEST:
    case RESET_PAGE_REQUEST:
      return {
        loading: true,
        isCreated: false,
        page: null,
      };
    case GET_PAGE_REQUEST:
    case UPDATE_PAGE_REQUEST:
      return {
        loading: true,
        isLoaded: false,
        page: null,
      };

    case NEW_PAGE_SUCCESS:
      return {
        loading: true,
        isCreated: true,
        page: action.payload,
      };
    case GET_PAGE_SUCCESS:
    case UPDATE_PAGE_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        isLoaded: true,
        page: action.payload,
      };
    case NEW_PAGE_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload,
      };

    case GET_PAGE_FAIL:
    case UPDATE_PAGE_FAIL:
      return {
        loading: false,
        isLoaded: false,
        error: action.payload,
      };
    case NEW_PAGE_RESET:
    case GET_PAGE_RESET:
    case UPDATE_PAGE_RESET:
      return {
        loading: false,
        isLoaded: false,
        page: null,
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

export const typesReducer = (state = { types: [], total: 0 }, action) => {
  switch (action.type) {
    case ALL_ADTYPE_REQUEST:
      return {
        loading: true,
        types: [],
      };
    case DELETE_ADTYPE_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case ALL_ADTYPE_SUCCESS:
      return {
        loading: false,
        types: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case DELETE_ADTYPE_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        types: [],
      };
    case ALL_ADTYPE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_ADTYPE_RESET:
      return {
        types: [],
        isUpdated: false,
      };
    case DELETE_ADTYPE_FAIL:
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

export const typeReducer = (state = { type: null }, action) => {
  switch (action.type) {
    case NEW_ADTYPE_REQUEST:
    case UPDATE_ADTYPE_REQUEST:
    case RESET_ADTYPE_REQUEST:
      return {
        loading: true,
        isCreated: false,
        type: null,
      };
    case GET_ADTYPE_REQUEST:
    case UPDATE_ADTYPE_REQUEST:
      return {
        loading: true,
        isLoaded: false,
        type: null,
      };

    case NEW_ADTYPE_SUCCESS:
      return {
        loading: true,
        isCreated: true,
        type: action.payload,
      };
    case GET_ADTYPE_SUCCESS:
    case UPDATE_ADTYPE_SUCCESS:
      return {
        loading: false,
        isLoaded: true,
        type: action.payload,
      };
    case NEW_ADTYPE_FAIL:
    case UPDATE_ADTYPE_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload,
      };

    case GET_ADTYPE_FAIL:
      return {
        loading: false,
        isLoaded: false,
        error: action.payload,
      };
    case NEW_ADTYPE_RESET:
    case GET_ADTYPE_RESET:
    case UPDATE_ADTYPE_RESET:
      return {
        loading: false,
        isLoaded: false,
        type: null,
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

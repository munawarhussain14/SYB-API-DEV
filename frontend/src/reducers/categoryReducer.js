import {
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_RESET,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  GET_SUB_CATEGORY_REQUEST,
  GET_SUB_CATEGORY_SUCCESS,
  GET_SUB_CATEGORY_FAIL,
  GET_CATEGORY_RESET,
} from "../constants/categoryConstants";

export const categoryReducer = (
  state = { loading: false, isLoaded: false, options: [] },
  action
) => {
  switch (action.type) {
    case ALL_CATEGORY_REQUEST:
      return {
        isLoaded: false,
        loading: false,
        options: [],
      };
    case ALL_CATEGORY_SUCCESS:
      return {
        isLoaded: true,
        loading: false,
        options: action.payload.data,
        count: action.payload.count,
        total: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case ALL_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const singleCategoryReducer = (
  state = { loading: false, isLoaded: false, isUpdated: false, category: {} },
  action
) => {
  switch (action.type) {
    case NEW_CATEGORY_REQUEST:
      return {
        loading: true,
        isCreated: false,
        category: {},
        isLoaded: false,
      };
    case UPDATE_CATEGORY_REQUEST:
      return {
        loading: true,
        isUpdated: false,
        category: {},
        isLoaded: false,
      };
    case GET_CATEGORY_REQUEST:
    case GET_CATEGORY_RESET:
      return {
        loading: true,
        isCreated: false,
        category: {},
        isLoaded: false,
      };
    case NEW_CATEGORY_RESET:
      return {
        loading: false,
        isCreated: false,
        category: {},
        isLoaded: false,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        isLoaded: true,
        category: action.payload.data,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        isUpdated: true,
        loading: false,
        isLoaded: true,
        category: action.payload.data,
      };
    case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        isLoaded: true,
        isCreated: true,
        category: action.payload.data,
      };
    case GET_CATEGORY_FAIL:
    case NEW_CATEGORY_FAIL:
    case UPDATE_CATEGORY_FAIL:
      return {
        loading: false,
        isLoaded: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const subCategoryReducer = (state = { sub_categories: [] }, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORY_REQUEST:
      return {
        loading: true,
        sub_categories: [],
      };
    case GET_SUB_CATEGORY_SUCCESS:
      return {
        loading: false,
        sub_categories: action.payload.data,
      };
    case GET_SUB_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

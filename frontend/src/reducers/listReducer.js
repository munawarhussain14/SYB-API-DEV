import {
  ADMIN_LISTS_REQUEST,
  ADMIN_LISTS_SUCCESS,
  ADMIN_LISTS_FAIL,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_RESET,
  UPDATE_LIST_FAIL,
  ALL_LISTS_REQUEST,
  ALL_LISTS_SUCCESS,
  ALL_LISTS_FAIL,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
  LIST_DETAILS_FAIL,
  LIST_DELETE_REQUEST,
  LIST_DELETE_SUCCESS,
  LIST_DELETE_FAIL,
  LIST_STATUS_REQUEST,
  LIST_STATUS_SUCCESS,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAIL,
  CLEAR_ERRORS,
} from "../constants/listConstants";

export const listReducer = (state = { lists: [], total: 0 }, action) => {
  switch (action.type) {
    case ALL_LISTS_REQUEST:
    case ADMIN_LISTS_REQUEST:
    case LIST_STATUS_REQUEST:
    case LIST_DELETE_REQUEST:
      return {
        loading: true,
        isDeleted: false,
        lists: [],
      };
    case ALL_LISTS_SUCCESS:
      return {
        loading: false,
        isDeleted: false,
        lists: action.payload.data,
        listsCount: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case LIST_DELETE_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        lists: action.payload.data,
        listsCount: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case ADMIN_LISTS_SUCCESS:
      return {
        loading: false,
        isDeleted: false,
        lists: action.payload.lists,
        listsCount: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case LIST_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isApproved: action.payload,
      };
    case ALL_LISTS_FAIL:
    case ADMIN_LISTS_FAIL:
    case UPDATE_LIST_FAIL:
    case LIST_DELETE_FAIL:
      return {
        loading: false,
        isDeleted: false,
        error: action.payload,
      };
    case UPDATE_LIST_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const listDetailsReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case LIST_DETAILS_REQUEST:
    case UPLOAD_IMAGE_REQUEST:
    case DELETE_IMAGE_REQUEST:
    case UPDATE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        isUpdated: false,
        isUploaded: false,
      };
    case LIST_DETAILS_SUCCESS:
    case DELETE_IMAGE_SUCCESS:
      return {
        loading: false,
        list: action.payload.data,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        loading: false,
        list: action.payload.data,
        isUploaded: true,
      };
    case UPDATE_LIST_SUCCESS:
      return {
        loading: false,
        list: action.payload.data,
        isUpdated: true,
        isUploaded: true,
      };
    case LIST_DETAILS_FAIL:
    case UPLOAD_IMAGE_FAIL:
    case DELETE_IMAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_LIST_RESET:
      return {
        loading: false,
        isUpdated: false,
        list: [],
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

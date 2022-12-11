import {
  ALL_ADVERTISEMENTS_REQUEST,
  ALL_ADVERTISEMENTS_SUCCESS,
  ALL_ADVERTISEMENTS_FAIL,
  ALL_ADVERTISEMENTS_RESET,
  NEW_ADVERTISEMENT_REQUEST,
  NEW_ADVERTISEMENT_SUCCESS,
  NEW_ADVERTISEMENT_RESET,
  NEW_ADVERTISEMENT_FAIL,
  GET_ADVERTISEMENT_REQUEST,
  GET_ADVERTISEMENT_SUCCESS,
  GET_ADVERTISEMENT_FAIL,
  UPDATE_ADVERTISEMENT_REQUEST,
  UPDATE_ADVERTISEMENT_SUCCESS,
  UPDATE_ADVERTISEMENT_RESET,
  UPDATE_ADVERTISEMENT_FAIL,
  DELETE_ADVERTISEMENT_REQUEST,
  DELETE_ADVERTISEMENT_SUCCESS,
  DELETE_ADVERTISEMENT_RESET,
  DELETE_ADVERTISEMENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/advertisementConstants";

export const advertisementReducer = (
  state = { advertisements: [], total: 0 },
  action
) => {
  switch (action.type) {
    case ALL_ADVERTISEMENTS_REQUEST:
    case DELETE_ADVERTISEMENT_REQUEST:
      return {
        loading: true,
        advertisements: [],
        isDeleted: false,
      };
    case ALL_ADVERTISEMENTS_SUCCESS:
      return {
        loading: false,
        isDeleted: false,
        advertisements: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case DELETE_ADVERTISEMENT_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        advertisements: action.payload.data,
        advertisementsCount: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case ALL_ADVERTISEMENTS_FAIL:
    case DELETE_ADVERTISEMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_ADVERTISEMENTS_RESET:
    case DELETE_ADVERTISEMENT_RESET:
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

export const advertisementDetailReducer = (
  state = { loading: true, advertisement: null },
  action
) => {
  switch (action.type) {
    case NEW_ADVERTISEMENT_REQUEST:
    case GET_ADVERTISEMENT_REQUEST:
    case UPDATE_ADVERTISEMENT_REQUEST:
      return {
        loading: true,
        isUpdated: false,
        advertisement: null,
      };
    case NEW_ADVERTISEMENT_SUCCESS:
    case UPDATE_ADVERTISEMENT_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
        advertisement: action.payload.advertisement,
      };
    case GET_ADVERTISEMENT_SUCCESS:
      return {
        loading: false,
        advertisement: action.payload.advertisement,
      };
    case NEW_ADVERTISEMENT_FAIL:
    case GET_ADVERTISEMENT_FAIL:
    case UPDATE_ADVERTISEMENT_FAIL:
      return {
        loading: false,
        isUpdated: false,
        error: action.payload.message,
      };
    case NEW_ADVERTISEMENT_RESET:
    case UPDATE_ADVERTISEMENT_RESET:
      return {
        loading: false,
        isUpdated: false,
        advertisement: null,
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

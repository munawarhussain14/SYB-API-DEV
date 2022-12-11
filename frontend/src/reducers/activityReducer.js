import {
  ALL_ACTIVITY_REQUEST,
  ALL_ACTIVITY_SUCCESS,
  ALL_ACTIVITY_FAIL,
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAIL,
  NEW_ACTIVITY_REQUEST,
  NEW_ACTIVITY_SUCCESS,
  NEW_ACTIVITY_FAIL,
  NEW_ACTIVITY_RESET,
  DELETE_ACTIVITY_REQUEST,
  DELETE_ACTIVITY_SUCCESS,
  DELETE_ACTIVITY_FAIL,
  CLEAR_ERRORS,
} from "../constants/businessActivityConstants";

export const activityReducer = (state = { activities: [] }, action) => {
  switch (action.type) {
    case ALL_ACTIVITY_REQUEST:
      return {
        loading: true,
        activities: [],
      };
    case ALL_ACTIVITY_SUCCESS:
      return {
        loading: false,
        activities: action.payload.data,
        total: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case ALL_ACTIVITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_ACTIVITY_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case DELETE_ACTIVITY_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        activities: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case DELETE_ACTIVITY_FAIL:
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

export const singleActivityReducer = (
  state = { activity: {}, loading: false },
  action
) => {
  switch (action.type) {
    case NEW_ACTIVITY_RESET:
      return {
        loading: false,
        activity: {},
        isCreated: false,
      };
    case GET_ACTIVITY_REQUEST:
    case NEW_ACTIVITY_REQUEST:
      return {
        loading: true,
        activity: {},
        isCreated: false,
      };
    case GET_ACTIVITY_SUCCESS:
      return {
        loading: false,
        activity: action.payload,
      };
    case NEW_ACTIVITY_SUCCESS:
      return {
        loading: false,
        activity: action.payload.data,
        isCreated: true,
      };
    case NEW_ACTIVITY_FAIL:
    case GET_ACTIVITY_FAIL:
      return {
        loading: false,
        activity: {},
        isCreated: false,
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

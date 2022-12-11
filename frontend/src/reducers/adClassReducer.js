import {
  ALL_ADCLASS_REQUEST,
  ALL_ADCLASS_SUCCESS,
  ALL_ADCLASS_FAIL,
  ALL_ADCLASS_RESET,
  NEW_ADCLASS_REQUEST,
  NEW_ADCLASS_SUCCESS,
  NEW_ADCLASS_RESET,
  NEW_ADCLASS_FAIL,
  GET_ADCLASS_REQUEST,
  GET_ADCLASS_SUCCESS,
  GET_ADCLASS_RESET,
  GET_ADCLASS_FAIL,
  UPDATE_ADCLASS_REQUEST,
  UPDATE_ADCLASS_SUCCESS,
  UPDATE_ADCLASS_RESET,
  UPDATE_ADCLASS_FAIL,
  RESET_ADCLASS_REQUEST,
  DELETE_ADCLASS_REQUEST,
  DELETE_ADCLASS_SUCCESS,
  DELETE_ADCLASS_FAIL,
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
} from "../constants/adClassConstants";

export const adClassesReducer = (
  state = { adClasses: [], total: 0 },
  action
) => {
  switch (action.type) {
    case ALL_ADCLASS_REQUEST:
      return {
        loading: true,
        adClasses: [],
      };
    case DELETE_ADCLASS_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case ALL_ADCLASS_SUCCESS:
      return {
        loading: false,
        adClasses: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case DELETE_ADCLASS_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        adClasses: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case ALL_ADCLASS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_ADCLASS_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_ADCLASS_FAIL:
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

export const adClassReducer = (state = { adClass: null }, action) => {
  switch (action.type) {
    case NEW_ADCLASS_REQUEST:
    case RESET_ADCLASS_REQUEST:
      return {
        loading: true,
        isCreated: false,
        adClass: null,
      };
    case GET_ADCLASS_REQUEST:
    case UPDATE_ADCLASS_REQUEST:
      return {
        loading: true,
        isLoaded: false,
        adClass: null,
      };

    case NEW_ADCLASS_SUCCESS:
      return {
        loading: true,
        isCreated: true,
        adClass: action.payload,
      };
    case GET_ADCLASS_SUCCESS:
    case UPDATE_ADCLASS_SUCCESS:
      console.log(action.payload);
      return {
        loading: false,
        isLoaded: true,
        adClass: action.payload,
      };
    case NEW_ADCLASS_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload,
      };

    case GET_ADCLASS_FAIL:
    case UPDATE_ADCLASS_FAIL:
      return {
        loading: false,
        isLoaded: false,
        error: action.payload,
      };
    case NEW_ADCLASS_RESET:
    case GET_ADCLASS_RESET:
    case UPDATE_ADCLASS_RESET:
      return {
        loading: false,
        isLoaded: false,
        adClass: null,
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
    // case UPDATE_ADTYPE_REQUEST:
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

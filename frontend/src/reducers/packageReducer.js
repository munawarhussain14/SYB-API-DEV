import {
  ALL_PACKAGES_REQUEST,
  ALL_PACKAGES_SUCCESS,
  UPDATE_PACKAGE_REQUEST,
  UPDATE_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_FAIL,
  ALL_PACKAGES_FAIL,
  ALL_PACKAGES_RESET,
  NEW_PACKAGE_REQUEST,
  NEW_PACKAGE_SUCCESS,
  NEW_PACKAGE_FAIL,
  NEW_PACKAGE_RESET,
  GET_PACKAGE_REQUEST,
  GET_PACKAGE_SUCCESS,
  GET_PACKAGE_FAIL,
  GET_PACKAGE_RESET,
  CLEAR_ERRORS,
  DELETE_PACKAGE_REQUEST,
  DELETE_PACKAGE_SUCCESS,
  DELETE_PACKAGE_FAIL,
  RESET_PACKAGE_REQUEST,
} from "../constants/packageConstants";

export const packagesReducer = (state = { packages: [], total: 0 }, action) => {
  switch (action.type) {
    case ALL_PACKAGES_REQUEST:
      return {
        loading: true,
        packages: [],
      };
    case DELETE_PACKAGE_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case ALL_PACKAGES_SUCCESS:
      return {
        loading: false,
        packages: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case DELETE_PACKAGE_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        packages: [],
      };
    case ALL_PACKAGES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_PACKAGES_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_PACKAGE_FAIL:
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

export const packagesDetailReducer = (state = { package: {} }, action) => {
  switch (action.type) {
    case NEW_PACKAGE_REQUEST:
      return {
        loading: true,
        isCreated: false,
        package: null,
      };
    case GET_PACKAGE_REQUEST:
    case UPDATE_PACKAGE_REQUEST:
      return {
        loading: true,
        isLoaded: false,
        isUpdated: false,
        package: {},
      };

    case NEW_PACKAGE_SUCCESS:
    case UPDATE_PACKAGE_SUCCESS:
      return {
        loading: true,
        isCreated: true,
        isUpdated: true,
        package: action.payload,
      };
    case GET_PACKAGE_SUCCESS:
      return {
        loading: false,
        isLoaded: true,
        package: action.payload,
      };
    case NEW_PACKAGE_FAIL:
    case UPDATE_PACKAGE_FAIL:
      return {
        loading: false,
        isCreated: false,
        isUpdated: false,
        error: action.payload,
      };

    case GET_PACKAGE_FAIL:
      return {
        loading: false,
        isLoaded: false,
        error: action.payload,
      };
    case NEW_PACKAGE_RESET:
    case GET_PACKAGE_RESET:
    case RESET_PACKAGE_REQUEST:
      return {
        loading: false,
        isLoaded: false,
        package: {},
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

import {
  ALL_ADPACKAGES_REQUEST,
  ALL_ADPACKAGES_SUCCESS,
  ALL_ADPACKAGES_FAIL,
  ALL_ADPACKAGES_RESET,
  NEW_ADPACKAGE_REQUEST,
  NEW_ADPACKAGE_SUCCESS,
  NEW_ADPACKAGE_FAIL,
  NEW_ADPACKAGE_RESET,
  GET_ADPACKAGE_REQUEST,
  GET_ADPACKAGE_SUCCESS,
  GET_ADPACKAGE_FAIL,
  GET_ADPACKAGE_RESET,
  CLEAR_ERRORS,
  DELETE_ADPACKAGE_REQUEST,
  DELETE_ADPACKAGE_SUCCESS,
  DELETE_ADPACKAGE_FAIL,
  RESET_ADPACKAGE_REQUEST,
  UPDATE_ADPACKAGE_REQUEST,
  UPDATE_ADPACKAGE_SUCCESS,
  UPDATE_ADPACKAGE_FAIL,
} from "../constants/adPackageConstants";

export const adPackagesReducer = (
  state = { packages: [], total: 0 },
  action
) => {
  switch (action.type) {
    case ALL_ADPACKAGES_REQUEST:
      return {
        loading: true,
        packages: [],
      };
    case DELETE_ADPACKAGE_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case ALL_ADPACKAGES_SUCCESS:
      return {
        loading: false,
        packages: action.payload.data,
        count: action.payload.total,
        resPerPage: action.payload.resPerPage,
      };
    case DELETE_ADPACKAGE_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
        packages: [],
      };
    case ALL_ADPACKAGES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ALL_ADPACKAGES_RESET:
      return {
        packages: [],
        isUpdated: false,
      };
    case DELETE_ADPACKAGE_FAIL:
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

export const adPackagesDetailReducer = (state = { package: {} }, action) => {
  switch (action.type) {
    case NEW_ADPACKAGE_REQUEST:
      return {
        loading: true,
        isCreated: false,
        package: null,
      };
    case GET_ADPACKAGE_REQUEST:
    case UPDATE_ADPACKAGE_REQUEST:
      return {
        loading: true,
        isLoaded: false,
        package: {},
      };

    case NEW_ADPACKAGE_SUCCESS:
      return {
        loading: true,
        isCreated: true,
        package: action.payload,
      };
    case GET_ADPACKAGE_SUCCESS:
    case UPDATE_ADPACKAGE_SUCCESS:
      return {
        loading: false,
        isLoaded: true,
        package: action.payload,
      };
    case NEW_ADPACKAGE_FAIL:
    case UPDATE_ADPACKAGE_FAIL:
      return {
        loading: false,
        isCreated: false,
        error: action.payload,
      };

    case GET_ADPACKAGE_FAIL:
      return {
        loading: false,
        isLoaded: false,
        error: action.payload,
      };
    case NEW_ADPACKAGE_RESET:
    case GET_ADPACKAGE_RESET:
    case RESET_ADPACKAGE_REQUEST:
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

import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_FAIL,
  CLEAR_ERRORS,
} from "../constants/dashboardConstants";

export const dataReducer = (
  state = {
    summary: {
      total_listing: 0,
      approved_listing: 0,
      pending_listing: 0,
      total_user: 0,
      total_query: 0,
    },
  },
  action
) => {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DATA_SUCCESS:
      return {
        loading: false,
        summary: {
          total_listing: action.payload.total_listing,
          approved_listing: action.payload.approved_listing,
          pending_listing: action.payload.pending_listing,
          total_user: action.payload.total_user,
          total_query: action.payload.total_query,
        },
      };
    case DATA_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
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

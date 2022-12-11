import { getHttp } from "../config/app";

import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_FAIL,
} from "../constants/dashboardConstants";

export const getData = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_REQUEST });

    // const { data } = await axios.get(`${config.API_URL}/api/v1/summary`);

    const data = await getHttp(`summary`);
    dispatch({
      type: DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_FAIL,
      payload: error.response.data.message,
    });
  }
};

import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

const page = "buyerQueries";

export const getAll = async (params = {keyword:"", currentPage:1,status:"all"}) => {
  try {
    let custom_param = params.status != "all" ? `&status=${params.status}` : "";
    const data = await getHttp(
      `${page}?keyword=${params.keyword}&page=${params.currentPage}${custom_param}`
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const getQuery = async (id) => {
  try {
    //const { data } = await axios.get(`${config.API_URL}/api/v1/queries/${id}`);
    const data = await getHttp(`${page}/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateQuery = async (id, formData) => {
  try {
    const data = await putHttp(`${page}/${id}`, formData);

    return data;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const approveQuery = async (id, formData) => {
  try {
    const data = await putHttp(`${page}/approved/${id}`, formData);

    return data;
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

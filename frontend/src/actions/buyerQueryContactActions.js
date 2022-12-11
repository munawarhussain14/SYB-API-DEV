import { deleteHttp, getHttp, postHttp, putHttp } from "../config/app";

const page = "buyerQueriesContact";

export const getAll = async (params = {keyword:"", page:1}) => {
  try {
    let custom_param = {
      keyword: params.keyword,
      page: params.currentPage
    };

    if(params.status!="all"){
      custom_param = {status:params.status,...custom_param};
    }

    const data = await getHttp(`${page}`, params);

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

import Cookies from "universal-cookie";

const cookies = new Cookies();
const setting = {
  headers: {
    "Content-Type": "application/json",
    Authorization: cookies.get("token"),
  },
};
export default setting;

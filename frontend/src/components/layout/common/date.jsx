export const DateFormat = (parm, time = false) => {
  //console.log(parm);
  if (parm) {
    let date = new Date(parm);
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = date.getMonth();

    if (month < 10) {
      month = "0" + (month + 1);
    }

    let response = `${day}-${month}-${date.getFullYear()}`;
    if (time)
      response += ` ${date.getUTCHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    return response;
  } else return "None";
};

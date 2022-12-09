const CleanFlter = async (query, columns) => {
  let keyword = [];
  if (columns && query.keyword) {
    let temps = [];
    columns.forEach((e) => {
      temps.push({
        [e]: {
          $regex: query.keyword,
          $options: "i",
        },
      });
    });
    keyword = temps;
    return { $or: keyword };
  } else {
    return {};
  }
};

module.exports = CleanFlter;

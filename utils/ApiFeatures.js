class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(columns = null) {
    let keyword = [];
    if (columns && this.queryStr.keyword) {
      let temps = [];
      columns.forEach((e) => {
        temps.push({
          [e]: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        });
      });
      keyword = temps;
      this.query = this.query.find({ $or: keyword });
    } else {
      this.query = this.query.find();
    }

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "limit", "page", "type", "resPerPage"];
    const type = queryCopy["type"];
    removeFields.forEach((el) => delete queryCopy[el]);

    if (queryCopy["_id"]) {
      if (queryCopy["_id"]["in"]) {
        queryCopy["_id"]["in"] = queryCopy["_id"]["in"].split(",");
      }
    }

    if (type == "all") {
    } else if (type === "approved") {
      queryCopy["status"] = true;
    } else if (type == "pending") {
      queryCopy["status"] = false;
      queryCopy["init_info_status"] = true;
      queryCopy["basic_info_status"] = true;
      queryCopy["finance_status"] = true;
      queryCopy["images_status"] = true;
      queryCopy["location_detail_status"] = true;
      queryCopy["real_estate_status"] = true;
      //queryCopy["package_status"] = true
      //package_status: true
    } else if (type == "uncompleted") {
      //queryCopy["status"] = false
      queryCopy["$or"] = [
        { init_info_status: false },
        { basic_info_status: false },
        { finance_status: false },
        { images_status: false },
        { location_detail_status: false },
        { real_estate_staus: false },
      ];
    } else {}

    //Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(
      /\b(in|gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    let condition = JSON.parse(queryStr);

    this.query = this.query.find(condition);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

  sort(column) {
    this.query = this.query.sort(column);
    return this;
  }
}

module.exports = ApiFeatures;

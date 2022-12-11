import React from "react";

const Search = (props) => {
  const { onSearch } = props;
  //let navigator = useNavigate();
  //const [keyword, setKeyword] = useState("");

  const searchHandler = (keyword) => {
    //e.preventDefault();
    if (keyword.trim()) {
      //console.log(keyword);
      onSearch(keyword);
      //navigator(`/search/${keyword}`);
    } else {
      //navigator(`/`);
    }
  };

  return (
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Enter Product Name ..."
        onChange={(e) => searchHandler(e.target.value)}
      />
      <div className="input-group-append">
        <button id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default Search;

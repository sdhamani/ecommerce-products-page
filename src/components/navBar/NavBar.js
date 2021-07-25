import React, { useEffect, useState } from "react";
import "./navbar.css";
import useProducts from "../../contexts/products-context";
function NavBar() {
  const [searchText, setSearchText] = useState("");
  const { dispatch } = useProducts();

  useEffect(() => {
    dispatch({ type: "FILTERSEARCH", payload: searchText });
  }, [searchText, dispatch]);
  return (
    <nav className="nav">
      <div className="nav-bar-input">
        <button className="nav-search-btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          className="nav-search-inp"
          placeholder="Search for products , brands and more"
          type="text"
        />
      </div>
    </nav>
  );
}

export default NavBar;

import React from "react";
import "./products.css";
import { useState } from "react";
import Card from "../card/Card";
import useProducts from "../../contexts/products-context";

function Products() {
  const { filteredArray, dispatch, categories } = useProducts();
  const [selectedOption, setSelectedOption] = useState("NEW");
  const [numOfCatToShow, setNumOfCatToShow] = useState(8);

  let filteredCat = categories.slice(0, numOfCatToShow);
  return (
    <div className="products-flex">
      <div className="sort-by">
        <label>Sort by: </label>
        <select
          value={selectedOption}
          className="sort-option"
          onChange={(e) => {
            dispatch({ type: "SORT", payload: e.target.value });
            setSelectedOption(e.target.value);
          }}
        >
          {" "}
          <option value="NEW">What's New</option>
          <option value="POPULARITY">Popularity</option>
          <option value="RATING">RATING</option>
          <option value="LOWTOHIGH">Price: Low to High</option>
          <option value="HIGHTOLOW">Price: High to Low</option>
        </select>
      </div>

      <div className="action-bar">
        <div className="filter-action">
          <h5 className="actions-heading">FILTER BY CATEOGORY</h5>
          {filteredCat.length > 0 && (
            <>
              {filteredCat.map((cate) => {
                return (
                  <div className="actions-types" key={cate}>
                    <input
                      type="checkbox"
                      onClick={() =>
                        dispatch({ type: "FILTERCAT", payload: cate })
                      }
                      name={cate}
                    />
                    <label className="action-cat" htmlFor={cate}>
                      {cate}
                    </label>
                  </div>
                );
              })}
              <div className="show-more">
                {categories.length !== numOfCatToShow && (
                  <button
                    className="show-more-btn"
                    onClick={() => setNumOfCatToShow(categories.length)}
                  >
                    + {categories.length - numOfCatToShow} more
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="cards-products">
        <Card products={filteredArray} />
      </div>
    </div>
  );
}

export default Products;

import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";

const ProductContainer = createContext();

export default function useProducts() {
  return useContext(ProductContainer);
}

function dispatchfun(state, value) {
  switch (value.type) {
    case "SORT":
      return { ...state, sortBy: value.payload };
    case "FILTERCAT": {
      if (value.payload === "") {
        return {
          ...state,
          filterByCateogory: [],
        };
      }
      return {
        ...state,
        filterByCateogory: state.filterByCateogory.includes(value.payload)
          ? state.filterByCateogory.filter((item) => item !== value.payload)
          : [...state.filterByCateogory, value.payload],
      };
    }
    case "FILTERSEARCH": {
      if (value.payload === "") {
        return {
          ...state,
          filterBySearch: "",
        };
      }
      return {
        ...state,
        filterBySearch: value.payload,
      };
    }
    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState([]);

  const updateCat = () => {
    let uniqueCategories = new Set();
    let catArr = [];
    products?.map((item) => uniqueCategories.add(item.category));

    for (const value of uniqueCategories) {
      catArr.push(value);
    }
    setCategories(catArr);
  };

  useEffect(() => {
    async function fecthproducts() {
      await axios
        .get(process.env.REACT_APP_GET_PRODUCTS_API)
        .then((data) => setProducts(data.data.products));
    }
    fecthproducts();
  }, []);

  useEffect(() => {
    updateCat();
  }, [products]);

  const [{ sortBy, filterByCateogory, filterBySearch }, dispatch] = useReducer(
    dispatchfun,
    {
      sortBy: false,
      filterByCateogory: [],
      filterBySearch: "",
    }
  );

  const sortByFun = (prodArray, sortBy) => {
    if (sortBy === "LOWTOHIGH") {
      prodArray.sort(function (a, b) {
        return a["price"] - b["price"];
      });
    }
    if (sortBy === "HIGHTOLOW") {
      prodArray.sort(function (a, b) {
        return b["price"] - a["price"];
      });
    }
    if (sortBy === "NEW") {
      prodArray.sort(function (a, b) {
        return a["catalogDate"] - b["catalogDate"];
      });
    }
    if (sortBy === "POPULARITY") {
      prodArray.sort(function (a, b) {
        return a["ratingCount"] - b["ratingCount"];
      });
    }
    if (sortBy === "RATING") {
      prodArray.sort(function (a, b) {
        return b["price"] - a["price"];
      });
    }
    return prodArray;
  };

  const sortedArray = sortByFun(products, sortBy);

  const filterArray = (sortedArray, { filterByCateogory, filterBySearch }) => {
    let initalArray = sortedArray;

    if (filterByCateogory.length !== 0) {
      initalArray = initalArray.filter((item) => {
        return filterByCateogory.includes(`${item.category}`);
      });
    }

    initalArray = initalArray?.filter(
      (prod) =>
        prod.productName
          .toLowerCase()
          .startsWith(filterBySearch.toLowerCase()) ||
        prod.brand.toLowerCase().startsWith(filterBySearch.toLowerCase())
    );

    return initalArray;
  };

  const filteredArray = filterArray(sortedArray, {
    filterByCateogory,
    filterBySearch,
  });

  return (
    <ProductContainer.Provider
      value={{
        filteredArray: filteredArray,
        dispatch: dispatch,
        categories: categories,
      }}
    >
      {children}{" "}
    </ProductContainer.Provider>
  );
}

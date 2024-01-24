import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import "./products.css";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${BASE_URL}products?category=${cat}`
            : `${BASE_URL}products`
        );
        setProducts(res.data);
      } catch (err) { }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className="container-products">
      {cat
        ? filteredProducts.map((item, index) => (
          <Product item={item} key={item.id || index} />
        ))
        : products
          .slice(0, 8)
          .map((item, index) => <Product item={item} key={item.id || index} />)
      }
    </div>
  );
};

export default Products;

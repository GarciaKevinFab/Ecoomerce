import React from 'react';
import { categories } from "../../data";
import CategoryItem from "../CategoryItem";
import './Categories.css';

const Categories = () => {
  return (
    <div className="Containers-categories">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Categories;

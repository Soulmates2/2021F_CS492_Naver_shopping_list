import React from 'react';
import ParentMenuList from '../shopping/ParentMenuList';
import ProductList from '../shopping/ProductList';
import './ShoppingPage.css';
const ShoppingPage = () => {
  return (
    <div className="shoppingpage">
      <ParentMenuList />
      <ProductList />
    </div>
  );
};

export default ShoppingPage;

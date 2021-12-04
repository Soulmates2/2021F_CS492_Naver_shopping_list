import React from 'react';
import ParentMenuList from '../shopping/ParentMenuList';
import ProductList from '../shopping/ProductList';

const ShoppingPage = () => {
  return (
    <div className="shoppingpage">
      <ParentMenuList />
      <ProductList />
    </div>
  );
};

export default ShoppingPage;

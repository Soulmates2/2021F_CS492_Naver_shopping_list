import React from 'react';
import MenuList from '../shopping/MenuList';
import ProductList from '../shopping/ProductList';

const ShoppingPage = () => {
  return (
    <div className="shoppingpage">
      <h1>쇼핑페이지이다.</h1>
      <MenuList />
      <ProductList />
    </div>
  );
};

export default ShoppingPage;

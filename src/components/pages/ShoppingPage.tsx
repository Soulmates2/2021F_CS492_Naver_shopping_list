import React from 'react';
import MenuList from '../shopping/MenuList';
import ProductList from '../shopping/ProductList';
import { RouteComponentProps } from 'react-router-dom';

const ShoppingPage = (props: RouteComponentProps<{ channelID: string }>) => {
  const { channelID } = props.match.params;
  return (
    <div className="shoppingpage">
      <h1>쇼핑페이지이다.</h1>
      <MenuList channelID={channelID} />
      <ProductList channelID={channelID} />
    </div>
  );
};

export default ShoppingPage;

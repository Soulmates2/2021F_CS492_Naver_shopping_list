import React from 'react';
import ParentMenuList from '../shopping/ParentMenuList';
import ProductList from '../shopping/ProductList';
import { RouteComponentProps } from 'react-router-dom';

interface SPMatchProps {
  channelID: string;
}

const ShoppingPage = (props: RouteComponentProps<SPMatchProps, {}>) => {
  const channelID = props.match.params.channelID;
  return (
    <div className="shoppingpage">
      <ParentMenuList channelID={channelID} />
      <ProductList channelID={channelID}/>
    </div>
  );
};

export default ShoppingPage;

import React from 'react';
import MenuList from '../shopping/MenuList';
import ProductList from '../shopping/ProductList';
import { RouteComponentProps } from 'react-router-dom';
import WrongAccess from './WrongAccess';

interface SPMatchProps {
  channelID: string;
}

interface SPLocProps {
  name: string;
}

const ShoppingPage = (
  props: RouteComponentProps<SPMatchProps, {}, SPLocProps>,
) => {
  const channelID = props.match.params.channelID;
  return (
    <div className="shoppingpage">
      <MenuList channelID={channelID} />
      <ProductList channelID={channelID} />
    </div>
  );
};

export default ShoppingPage;

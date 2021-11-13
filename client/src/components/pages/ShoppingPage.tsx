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
  const channelName = props.location.state.name;
  return (
    <div className="shoppingpage">
      {props.location.state ? (
        <>
          <h1> {channelName}의 쇼핑페이지이다.</h1>
          <MenuList channelID={channelID} />
          <ProductList channelID={channelID} channelName={channelName} />
        </>
      ) : (
        <WrongAccess />
      )}
    </div>
  );
};

export default ShoppingPage;

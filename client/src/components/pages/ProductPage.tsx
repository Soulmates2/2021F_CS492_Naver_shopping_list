import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import WrongAccess from './WrongAccess';

interface ProductInfoProps {
  channel: object;
  menus: Array<string>;
  modDate: Date;
  name: string;
  productImages: Array<object>;
  salePrice: number;
  soldout: boolean;
  _id: string;
  view: object;
}

const ProductPage = (props: RouteComponentProps<{}, {}, ProductInfoProps>) => {
  const { state } = props.location;
  return (
    <div className="productPage">
      {state ? (
        <h1>{state.name}상품의 프로덕트페이지이다.</h1>
      ) : (
        <WrongAccess />
      )}
    </div>
  );
};

export default ProductPage;

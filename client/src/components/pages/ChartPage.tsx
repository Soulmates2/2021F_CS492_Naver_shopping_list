import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import OptionList from '../chart/OptionList';
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

const ChartPage = (props: RouteComponentProps<{}, {}, ProductInfoProps>) => {
  const { state } = props.location;
  return (
    <div className="ChartPage">
      {state ? (
        <h1>{state.name}상품의 프로덕트페이지이다.</h1>
      ) : (
        <WrongAccess />
      )}
      <OptionList optionID={"1"}></OptionList>
    </div>
    
  );
};

export default ChartPage;

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
// import { productState } from '../chart/states/product.state';
import OptionList from '../chart/OptionList';

const ChartPage = (props: RouteComponentProps<{ productID: string }>) => {
  // const { productID } = props.match.params;
  // const [productName] = useRecoilState(productState);


  return (
    <div className="chartpage">
      <h1>상품 OO의 차트페이지이다.</h1>
      <OptionList optionID={"1"}> </OptionList>
    </div>
  );
};

export default ChartPage;

// import React, { useState, useEffect } from 'react';
// import { getProducts } from '../../lib/api/shopping';
// import { useRecoilState } from 'recoil';
// import { productState } from './states/product.state';
// import Product from '../shopping/Product';

interface OptionProps {
    optionID : string;
  }
  const OptionList = (props: OptionProps) => {
    // const [OptionList, setOptionList] = useState([]);
    // const [productName] = useRecoilState(productState);
  
    const options = props.optionID
  
    //옵션 리스트를 만듭니다.
    return (
      <div className="optionList">
        <h1>분야 통계</h1>
        <h2>기간</h2>
        <option>일간</option>
        <option>주간</option>
        <option>월간</option>
      </div>
    );
  };
  
  export default OptionList;
  
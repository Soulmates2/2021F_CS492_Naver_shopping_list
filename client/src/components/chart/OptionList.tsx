import React, { useState, useEffect } from 'react';
// import { getProducts } from '../../lib/api/shopping';
// import { useRecoilState } from 'recoil';
// import { productState } from './states/product.state';
// import Product from '../shopping/Product';
import { Radio } from 'antd';


const sample = ["x", "2021-11-10", "2021-11-12", "2021-11-12", "2021-11-14", "2021-11-22"]
const dibs = {"total":10, "2021-11-10":1, "2021-11-12":2}

function isNumeric(data : string) : boolean {
  return !isNaN(Number(data));
}

function dibsDatetoMonth(data: Object) {
  var month: any[] = [];
  console.log(Object.keys(data));
  for (const key of Object.keys(data) as (keyof typeof data)[]) {
    console.log(data[key]);
    if (isNumeric(key[0])) {
      if (!month.includes(key)) {
        console.log(key);
        // 에러 발생
        const tempYear = ((key as unknown) as Date).getFullYear();
        const tempMonth = (key as unknown as Date).getMonth();
        const tempDate = tempYear + "-" + tempMonth;
        console.log(tempDate)
      }
    }
  }
}

function dibsDatetoDay(data: Object) {
  
}

interface OptionProps {
  optionID : string;
}


const OptionList = (props: OptionProps) => {
  // const [OptionList, setOptionList] = useState([]);
  // const [productName] = useRecoilState(productState);

  const options = props.optionID
  const [option, setOption] = useState(1);


  const handleInputChange = (value: number) => {
    if (value == 2) 
      dibsDatetoDay(dibs);
    if (value == 3) 
      dibsDatetoMonth(dibs);
    setOption(value);
  };

  //옵션 리스트를 만듭니다.
  return (
    <div className="optionList">
      <h1>분야 통계</h1>
      <h2>기간</h2>
      <Radio.Group>
        <Radio value={1} onChange={e => handleInputChange(1)}>일간</Radio>
        <Radio value={2} onChange={e => handleInputChange(2)}>주간</Radio>
        <Radio value={3} onChange={e => handleInputChange(3)}>월간</Radio>
      </Radio.Group>
    </div>
  );
};

export default OptionList;
  
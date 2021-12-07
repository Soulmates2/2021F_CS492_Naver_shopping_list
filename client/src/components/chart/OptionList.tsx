import React, { useState, useEffect } from 'react';
// import { getProducts } from '../../lib/api/shopping';
// import { useRecoilState } from 'recoil';
// import { productState } from './states/product.state';
// import Product from '../shopping/Product';
import { Radio } from 'antd';


interface OptionProps {
  optionID : string;
  onClick : any;
}


const OptionList = (props: OptionProps) => {
  // const [OptionList, setOptionList] = useState([]);
  // const [productName] = useRecoilState(productState);

  const options = props.optionID;
  const [option, setOption] = useState(1);

  // const handleInputChange = (value: number) => {
  //   setOption(value);

  //   const temp : HTMLCollectionOf<Element> = document.getElementsByTagName("Radio");
  //   console.log("temp", temp);

  //   if (value == 1) {
  //     console.log("1");
  //   }
  //   if (value == 2) {
  //     console.log("2");
  //   }
  //   if (value == 3) {
  //     console.log("3");
  //   }
  // };
//   document!.getElementById('name').onclick = function() {
//     var radios = document.getElementsByName('contact');
//     for (var radio of radios)
//     {
//         if (radio.checked) {
//             alert(radio.value);
//         }
//     }
// }
  //옵션 리스트를 만듭니다.
  return (
    <div className="optionList">
      <h1>분야 통계</h1>
      <h2>기간</h2>
      <Radio.Group>
        {/* <Radio value={1} name="range" onChange={e => handleInputChange(1)} checked={true}>일간</Radio>
        <Radio value={2} name="range" onChange={e => handleInputChange(2)}>주간</Radio>
        <Radio value={3} name="range" onChange={e => handleInputChange(3)}>월간</Radio> */}
        <Radio value={1} name="range" checked={true}>일간</Radio>
        <Radio value={2} name="range" >주간</Radio>
        <Radio value={3} name="range" >월간</Radio>
      </Radio.Group>
    </div>
  );
};

export default OptionList;
  
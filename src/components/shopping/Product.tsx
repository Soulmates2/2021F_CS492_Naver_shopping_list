import React from 'react';

//product info의 내용과 타입들입니다.

// interface ProductInfoProps {
//   channel: object;
//   menus: Array<string>;
//   modDate: Date;
//   name: string;
//   productImages: Array<object>;
//   salePrice: number;
//   soldout: boolean;
//   _id: string;
// }

const Product = (props: any) => {
  const { info } = props;
  return <div className="product">{info.name}</div>;
};

export default Product;

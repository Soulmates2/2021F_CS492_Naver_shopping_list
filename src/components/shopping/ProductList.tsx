import React from 'react';
interface ProductProps {
  channelID: string;
}
const ProductList = (props: ProductProps) => {
  return <div>{props.channelID}프로덕트 리스트</div>;
};

export default ProductList;

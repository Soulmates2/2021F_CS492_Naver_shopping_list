import React from 'react';
import { Link } from 'react-router-dom';

//product info의 내용과 타입들입니다.
//이 내용들로 info.???를 사용해 상품카드를 만들면 됩니다.
// interface ProductInfoProps {
//   channel: object;
//   menus: Array<string>;
//   modDate: Date;
//   name: string;
//   productImages: Array<object>;
//   salePrice: number;
//   soldout: boolean;
//   _id: string;
//   view: object;
// }

const Product = (props: any) => {
  const { channel, info } = props;
  return (
    <div className="product">
      <Link to={`/${channel}/${props.info._id}`}>
        {info.name}
        <br />
        조회수:{info.view['total']}
      </Link>
    </div>
  );
};

export default Product;

import React from 'react';
import { Link } from 'react-router-dom';
import { viewPatchProduct } from '../../lib/api/shopping';

//product info의 내용과 타입들입니다.
//이 내용들로 info.???를 사용해 상품카드를 만들면 됩니다.
interface ProductInfoProps {
  channel: object;
  menus: Array<string>;
  modDate: Date;
  name: string;
  productImages: Array<object>;
  salePrice: number;
  soldout: boolean;
  _id: string;
  view: viewType;
}

interface viewType {
  total: number;
}

interface info {
  info: ProductInfoProps;
}

const Product = (props: info) => {
  const { info } = props;

  const viewUpdate = () => {
    viewPatchProduct(info._id);
  };
  return (
    <div className="product" onClick={viewUpdate}>
      <Link to={{ pathname: `/products/${info._id}`, state: info }}>
        {info.name}
        <br />
        조회수:{info.view['total']}
      </Link>
    </div>
  );
};

export default Product;

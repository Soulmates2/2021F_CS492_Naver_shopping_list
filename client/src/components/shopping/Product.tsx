import React from 'react';
import { Link } from 'react-router-dom';
import { viewPatchProduct } from '../../lib/api/shopping';
import './Product.css';


//product info의 내용과 타입들입니다.
//이 내용들로 상품카드를 만들면 됩니다.
export interface ProductInfoProps {
  channel: object;
  menus: Array<string>;
  modDate: Date;
  name: string;
  productImages: Array<imageInfo>;
  salePrice: number;
  soldout: boolean;
  _id: string;
  view: viewDibsType;
  dibs: viewDibsType;
}

interface imageInfo {
  imageType: string;
  order: number;
  url: string;
  width: number;
  height: number;
}

interface viewDibsType {
  total: number;
}

export interface info {
  info: ProductInfoProps;
}

const Product = (props: info) => {
  const { info } = props;
  const viewUpdate = () => {
    viewPatchProduct(info._id);
  };
  const n1 = info.salePrice;
  const cn1 = n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    
      <div className="product" >
        <Link to={{ pathname: `/products/${info._id}`, state: info }}>
        <div className="item_card" onClick={viewUpdate}>
          <div className="pic">
            <img src={info.productImages[0].url} className="img" alt="no image found" />
          </div>
          <p className="i_price">{cn1}원</p>
          <p className="i_name">{info.name}</p>
          <span className="i_view">Views: {info.view.total}  | </span>
          <span className="i_like">Likes: {info.dibs.total}  </span>
          <button className="button_like" aria-current="false">
            <span>찜하기</span>
          </button>
        </div>
        </Link>
      </div>
    
  );
};

export default Product;
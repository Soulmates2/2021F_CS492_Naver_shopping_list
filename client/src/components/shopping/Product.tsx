import React from 'react';
import { Link } from 'react-router-dom';
import { viewPatchProduct } from '../../lib/api/shopping';
import './ProductList.css';


//product info의 내용과 타입들입니다.
//이 내용들로 info.???를 사용해 상품카드를 만들면 됩니다.

const Product = (props: any) => {
  const { info } = props;
  // import img from info.productImages[0].url;
  // class ImageComponent extends Component {
  //   render() {
  //     return (
  //         <div>
  //             <img src={info.productImages[0].url} alt="display image" />
  //         </div>
  //     );
  //   }
  // }

  const viewUpdate = () => {
    console.log(props);
    viewPatchProduct(info._id);
  };
  const n1 = info.salePrice;
  const cn1 = n1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Link to={{ pathname: `/products/${info._id}`, state: info }}>
      <div className="product" onClick={viewUpdate}>
        <div className="item_card">
          <div className="pic">
            <img src={info.productImages[0].url} className="img" alt="no image found" />
            {/* <img src={require(info.productImages[0].url)} className="img" alt="no image found" /> */}
          </div>
          <p className="i_price">{cn1}원</p>
          <p className="i_name">{info.name}</p>
          <span className="i_view">Views: {info.view['total']}  | </span>
          <span className="i_like">Likes: 0</span>
          <button className="button_like" aria-current="false">
            <span>찜하기</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
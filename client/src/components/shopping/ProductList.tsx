import React, { useState, useEffect } from 'react';
import { getProducts } from '../../lib/api/shopping';
import Product from './Product';

interface ProductProps {
  channelID: string;
  channelName: string;
}
const ProductList = (props: ProductProps) => {
  const [ProductList, setProductList] = useState([]);

  //API와 연동하여 해당 channel의 모든 product들의 정보를 가져옵니다.
  useEffect(() => {
    (async () => {
      const { data } = await getProducts(props.channelID, props.channelName);
      setProductList(data);
    })();
  }, [props]);

  //프로덕트리스트로 프로덕트 컴포넌트의 리스트를 만듭니다.
  return (
    <div className="productList">
      <h1>Product List</h1>
      <ul>
        {ProductList.map((product) => {
          return (
            <li key={product['_id']}>
              <Product info={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;

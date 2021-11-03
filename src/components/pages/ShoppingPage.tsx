import React from 'react';
import MenuList from '../shopping/MenuList';
import ProductList from '../shopping/ProductList';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { channelState } from '../shopping/states/channel.state';

const ShoppingPage = (props: RouteComponentProps<{ channelID: string }>) => {
  const { channelID } = props.match.params;
  const [channelList] = useRecoilState(channelState);

  //현재 channel을 전역 state(recoil사용)를 통해 받아옵니다.
  const channel = channelList.find((data) => {
    if (data._id === channelID) {
      return true;
    }
    return false;
  }) || { _id: '0', name: '0' };

  return (
    <div className="shoppingpage">
      <h1>{channel.name}의 쇼핑페이지이다.</h1>
      <MenuList channelID={channelID} />
      <ProductList channelID={channelID} />
    </div>
  );
};

export default ShoppingPage;

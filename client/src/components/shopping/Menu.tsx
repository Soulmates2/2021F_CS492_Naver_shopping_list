import React from 'react';

interface MenuProp {
  _id: string;
  parentId: string;
  name: string;
  wholeIds: Array<string>;
}

interface MenuInfo {
  info: MenuProp;
}

const Menu = (props: MenuInfo) => {
  const { info } = props;
  //속도 및 메뉴정보와 관련하여 수정에정입니다.

  return <div>{info.name}</div>;
};

export default Menu;

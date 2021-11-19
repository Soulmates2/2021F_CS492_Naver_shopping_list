import React, { useState, useEffect } from 'react';
import { getChannelMenu } from '../../lib/api/shopping';
import Menu from './Menu';
interface MenuListProps {
  channelID: string;
}

const MenuList = (props: MenuListProps) => {
  const [MenuList, setMenuList] = useState([]);
  //API와 연동하여 해당 채널의 모든 메뉴들을 menuList에 세팅합니다.
  //메뉴는 몇가지 정보가 더 있어서 수정예정입니다.

  useEffect(() => {
    (async () => {
      const { data } = await getChannelMenu(props.channelID);
      setMenuList(data.menus);
    })();
  }, [props.channelID]);

  //메뉴리스트들로 메뉴 컴포넌트의 리스트를 만듭니다.
  return (
    <div className="menuList">
      <h1>Menu List</h1>
      {MenuList ? (
        <ul>
          {MenuList.map((menuID) => {
            return (
              <li key={menuID}>
                <Menu menuID={menuID} />
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MenuList;

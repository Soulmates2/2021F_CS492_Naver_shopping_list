import React, { useState, useEffect } from 'react';
import { getChannelMenu } from '../../lib/api/shopping';
import Menu from './Menu';

interface MenuListProps {
  channelID: string;
}

const MenuList = (props: MenuListProps) => {
  const [MenuList, setMenuList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getChannelMenu(props.channelID);
      setMenuList(data.menus);
    })();
  }, [props]);

  return (
    <div className="menuList">
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

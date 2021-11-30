import React, { useState, useEffect } from 'react';
import { getChannelParentMenu } from '../../lib/api/shopping';
import { Link, Route } from 'react-router-dom';
import ChildMenuList from './ChildMenuList';
interface MenuListProps {
  channelID: string;
}
interface MenuProp {
  _id: string;
  parentId: string;
  name: string;
  wholeIds: Array<string>;
}

const ParentMenuList = (props: MenuListProps) => {
  const [MenuList, setMenuList] = useState<MenuProp[]>([]);
  //API와 연동하여 해당 채널의 모든 메뉴들을 menuList에 세팅합니다.
  useEffect(() => {
    (async () => {
      const { data } = await getChannelParentMenu(props.channelID);
      setMenuList(data);
    })();
  }, [props.channelID]);

  //메뉴리스트들로 메뉴 컴포넌트의 리스트를 만듭니다.
  return (
    <div className="menuList">
      <h1>Menu List</h1>
      {MenuList ? (
        <ul>
          <li key="whole">
            <Link
              to={{
                pathname: `/channels/${props.channelID}`,
              }}
              replace
            >
              전체
            </Link>
          </li>
          {MenuList.map((menuInfo) => {
            return (
              <li key={menuInfo._id}>
                <Link
                  to={{
                    pathname: `/channels/${props.channelID}/category/${menuInfo._id}`,
                  }}
                  replace
                >
                  {menuInfo.name}
                  {menuInfo.wholeIds}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
      <Route
        path={`/channels/${props.channelID}/category/:menuId`}
        component={ChildMenuList}
      />
    </div>
  );
};

export default ParentMenuList;

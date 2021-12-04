import React, { useState, useEffect } from 'react';
import { getChannelParentMenu } from '../../lib/api/shopping';
import { Link, Route, useLocation } from 'react-router-dom';
import ChildMenuList from './ChildMenuList';

const ParentMenuList = () => {
  const [MenuList, setMenuList] = useState([]);
  const { channelID } = useLocation<{ channelID: string }>().state;
  console.log(channelID);
  //API와 연동하여 해당 채널의 모든 메뉴들을 menuList에 세팅합니다.
  useEffect(() => {
    (async () => {
      const { data } = await getChannelParentMenu(channelID);
      setMenuList(data);
    })();
  }, [channelID]);

  //메뉴리스트들로 메뉴 컴포넌트의 리스트를 만듭니다.
  return (
    <div className="menuList">
      {MenuList.length !== 0 ? (
        <ul>
          <li key="whole">
            <Link
              to={{
                pathname: `/channels/${channelID}`,
                state: { channelID: channelID },
              }}
            >
              전체
            </Link>
          </li>
          {MenuList.map((menuInfo: any) => {
            return (
              <li key={menuInfo._id}>
                <Link
                  to={{
                    pathname: `/channels/${channelID}/category`,
                    search: `category=${menuInfo._id}`,
                    state: { channelID: channelID },
                  }}
                >
                  {menuInfo.name}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
      <Route path={`/channels/:channelID/category`} component={ChildMenuList} />
    </div>
  );
};

export default ParentMenuList;

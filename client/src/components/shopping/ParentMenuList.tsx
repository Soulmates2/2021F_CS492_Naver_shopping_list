import React, { useState, useEffect } from 'react';
import { getChannelParentMenu } from '../../lib/api/shopping';
import { Link, Route, useLocation } from 'react-router-dom';
import ChildMenuList from './ChildMenuList';
import { Radio } from 'antd';

const ParentMenuList = () => {
  const [MenuList, setMenuList] = useState([]);
  const { channelID } = useLocation<{ channelID: string }>().state;
  const query = new URLSearchParams(useLocation().search);
  const categoryId = query.get('category') || '';
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
      <div className="parentMenuList">
        <h2>CATEGORY</h2>
        {MenuList.length !== 0 ? (
          <Radio.Group value={categoryId} buttonStyle="solid">
            <Link
              to={{
                pathname: `/channels/${channelID}`,
                state: { channelID: channelID },
              }}
              replace
            >
              <Radio.Button value={''} className="rbut">
                전체
              </Radio.Button>
            </Link>

            {MenuList.map((menuInfo: any) => {
              return (
                <Link
                  key={menuInfo._id}
                  to={{
                    pathname: `/channels/${channelID}/category`,
                    search: `category=${menuInfo._id}`,
                    state: {
                      channelID: channelID,
                      categoryName: menuInfo.name,
                    },
                  }}
                  replace
                >
                  <Radio.Button value={menuInfo._id}>
                    {menuInfo.name}
                  </Radio.Button>
                </Link>
              );
            })}
          </Radio.Group>
        ) : (
          <></>
        )}
      </div>
      <Route path={`/channels/:channelID/category`} component={ChildMenuList} />
    </div>
  );
};

export default ParentMenuList;

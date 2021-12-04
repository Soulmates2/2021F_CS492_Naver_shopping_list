import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getChildMenu } from '../../lib/api/shopping';

const ChilldMenuList = () => {
  const [childList, setChildList] = useState([]);
  const [menuChildList, setMenuChildList] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const { channelID } = useLocation<{ channelID: string }>().state;
  const categoryId = query.get('category');
  const menuId = query.get('menu');

  useEffect(() => {
    (async () => {
      if (categoryId) {
        const { data } = await getChildMenu(categoryId);
        setChildList(data);
      }
    })();
  }, [categoryId]);

  useEffect(() => {
    (async () => {
      if (menuId) {
        const { data } = await getChildMenu(menuId);
        setMenuChildList(data);
      }
    })();
  }, [menuId]);

  return (
    <div className="childMenuList">
      {childList.length !== 0 ? (
        <>
          <h1>촤일드</h1>
          {childList.map((data: any) => {
            return (
              <li key={data._id}>
                <Link
                  to={{
                    search: `category=${categoryId}&menu=${data._id}`,
                    state: { channelID: channelID },
                  }}
                >
                  {data.name}
                </Link>
              </li>
            );
          })}
        </>
      ) : (
        <></>
      )}
      {menuId !== null && menuChildList.length !== 0 ? (
        <>
          {menuChildList.map((data: any) => {
            return (
              <li key={data._id}>
                <Link
                  to={{
                    search: `category=${categoryId}&menu=${data.parentId}&submenu=${data._id}`,
                    state: { channelID: channelID },
                  }}
                >
                  {data.name}
                </Link>
              </li>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChilldMenuList;

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getChildMenu } from '../../lib/api/shopping';
import { List, Radio } from 'antd';

const ChilldMenuList = () => {
  const [childList, setChildList] = useState([]);
  const [menuChildList, setMenuChildList] = useState([]);
  const { channelID } = useLocation<{ channelID: string }>().state;
  const { menuname } = useLocation<{ menuname: string }>().state;
  const { submenuname } = useLocation<{ submenuname: string }>().state;
  const query = new URLSearchParams(useLocation().search);
  const categoryId = query.get('category');
  const menuId = query.get('menu');
  const submenuID = query.get('submenu');

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
      <h2>{menuname}</h2>
      {childList.length !== 0 ? (
        <Radio.Group value={menuId} buttonStyle="solid">
          {childList.map((data: any) => {
            return (
              <Link
                to={{
                  search: `category=${categoryId}&menu=${data._id}`,
                  state: {
                    channelID: channelID,
                    menuname: menuname,
                    submenuname: data.name,
                  },
                }}
              >
                <Radio.Button value={data._id}>{data.name}</Radio.Button>
              </Link>
            );
          })}
        </Radio.Group>
      ) : (
        <></>
      )}
      {menuChildList.length !== 0 ? (
        <div className="subMenuList">
          <h2>{submenuname}</h2>
          <Radio.Group value={submenuID} buttonStyle="solid">
            {menuChildList.map((data: any) => {
              return (
                <Link
                  to={{
                    search: `category=${categoryId}&menu=${data.parentId}&submenu=${data._id}`,
                    state: {
                      channelID: channelID,
                      menuname: menuname,
                      submenuname: submenuname,
                    },
                  }}
                >
                  <Radio.Button value={data._id}>{data.name}</Radio.Button>
                </Link>
              );
            })}
          </Radio.Group>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChilldMenuList;

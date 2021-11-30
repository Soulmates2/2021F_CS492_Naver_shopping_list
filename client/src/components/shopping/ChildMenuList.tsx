import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getChildMenu } from '../../lib/api/shopping';

interface MenuMatchProp {
  menuId: string;
}
const ChilldMenuList = (props: RouteComponentProps<MenuMatchProp>) => {
  const [childList, setChildList] = useState([]);
  const menuId = props.match.params.menuId;

  useEffect(() => {
    (async () => {
      const { data } = await getChildMenu(menuId);
      setChildList(data);
    })();
  }, [menuId]);

  return (
    <div className="childMenuList">
      {childList ? (
        <>
          {childList.map((data) => {
            return <div key={data['_id']}>{data['name']}</div>;
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChilldMenuList;

import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getChildMenu } from '../../lib/api/shopping';

// interface MenuProp {
//   _id: string;
//   parentId: string;
//   name: string;
//   wholeIds: Array<string>;
// }

interface MenuMatchProp {
  menuId: string;
}
// props: MenuInfo;
const ChilldMenuList = (props: RouteComponentProps<MenuMatchProp>) => {
  const [childList, setChildList] = useState([]);
  const menuId = props.match.params.menuId;

  useEffect(() => {
    (async () => {
      const { data } = await getChildMenu(menuId);
      setChildList(data);
    })();
  }, [menuId]);
  //속도 및 메뉴정보와 관련하여 수정에정입니다.
  return (
    <div className="childMenuList">
      {/* {childList ? (
        <>
          {childList.map((data) => {
            return <div>{data['name']}</div>;
          })}
        </>
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default ChilldMenuList;

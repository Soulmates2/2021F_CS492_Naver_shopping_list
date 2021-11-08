import React, { useEffect, useState } from 'react';
import { getMenu } from '../../lib/api/shopping';

interface MenuProp {
  menuID: string;
}

const Menu = (props: MenuProp) => {
  const [Menu, setMenu] = useState();
  //API와 연동하여 메뉴의 정보를 가져옵니다.
  //속도 및 메뉴정보와 관련하여 수정에정입니다.
  useEffect(() => {
    (async () => {
      const { data } = await getMenu(props.menuID);
      setMenu(data.name);
    })();
  }, [props]);

  return <div>{Menu}</div>;
};

export default Menu;

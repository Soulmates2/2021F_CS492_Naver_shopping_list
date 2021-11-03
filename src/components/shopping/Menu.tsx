import React, { useEffect, useState } from 'react';
import { getMenu } from '../../lib/api/shopping';

interface MenuProp {
  menuID: string;
}

const Menu = (props: MenuProp) => {
  const [Menu, setMenu] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await getMenu(props.menuID);
      setMenu(data.name);
    })();
  }, [props]);

  return <div>{Menu}</div>;
};

export default Menu;

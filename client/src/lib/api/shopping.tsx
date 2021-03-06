import client from './client';

//모든 채널들을 가져옵니다.
export const getAllChannels = () => {
  return client.get('/api/channels');
};

//해당 채널에 속하는 parent 메뉴들을 가져옵니다
export const getChannelParentMenu = (channelId: string) => {
  return client.get(`/api/channelmenus/${channelId}`);
};

export const getChildMenu = (menuId: string) => {
  return client.get(`/api/menus/parent/${menuId}`);
};

export const getProductsFromMenu = (
  channelId: string,
  menuId: string | null,
  page: number,
) => {
  return client.get(`/api/products/${page}`, {
    params: { channelNo: channelId, menuId: menuId },
  });
};

//프로덕트 id로 해당 프로덕트를 가져옵니다.
export const getProduct = (productId: string) => {
  return client.get(`/api/products/${productId}`);
};

//프로덕트 id로 해당 프로덕트를 가져옵니다.
export const getDibsofProduct = (productId: string) => {
  return client.get(`/api/products/dibs/${productId}`);
};

//현재시간을 data로 보내서 조회수를 증가시킵니다.
export const viewPatchProduct = (productId: string) => {
  function fillZero(width: number, str: string) {
    return str.length >= width ? str : new Array(width-str.length+1).join('0') + str;
  }
  const date_ob = new Date();
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = fillZero(2, date_ob.getHours().toString());
  const minutes = fillZero(2, date_ob.getMinutes().toString());
  const time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;

  return client.patch(`/api/products/${productId}`, {
    data: { time: time, type: 'view' },
  });
};

//현재시간을 data로 보내서 찜 횟수를 증가시킵니다.
export const dibsPatchProduct = (productId: string) => {
  function fillZero(width: number, str: string) {
    return str.length >= width ? str : new Array(width-str.length+1).join('0') + str;
  }
  const date_ob = new Date();
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = fillZero(2, date_ob.getHours().toString());
  const minutes = fillZero(2, date_ob.getMinutes().toString());
  const time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;

  return client.patch(`/api/products/${productId}`, {
    data: { time: time, type: 'dibs' },
  });
};
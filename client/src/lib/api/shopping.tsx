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

// //채널아이디와 채널네임이을 쿼리로 보내줘야 해당 채널의 프로덕트들을 가져올 수 있습니다.
// export const getProducts = (channelId: string) => {
//   return client.get(`/api/products`, {
//     params: { channelNo: channelId },
//   });
// };

//채널아이디와 채널네임이을 쿼리로 보내줘야 해당 채널의 프로덕트들을 가져올 수 있습니다.
export const getProducts = (channelId: string, page:number) => {
  return client.get(`/api/products/${page}`, {
    params: { channelNo: channelId},
  });
};

//프로덕트 id로 해당 프로덕트를 가져옵니다.
export const getProduct = (productId: string) => {
  return client.get(`/api/products/${productId}`);
};

//현재시간을 data로 보내서 조회수를 증가시킨다. YYYY-MM-DD HH:MM format
//찜기능은 어떻게?
export const viewPatchProduct = (productId: string) => {
  const date_ob = new Date();
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
  const time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;

  return client.patch(`/api/products/${productId}`, {
    data: { time: time, type: 'view' },
  });
};


//차트페이지에서 상품의 시간별 조회 정보를 가져옵니다.


//차트페이지에서 상품의 시간별 찜 정보를 가져옵니다.

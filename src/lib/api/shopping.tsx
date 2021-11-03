import client from './client';

//모든 채널들을 가져옵니다.
export const getAllChannels = () => {
  return client.get('/api/channels');
};

//해당 채널에 속하는 메뉴들을 가져옵니다
export const getChannelMenu = (channelId: string) => {
  return client.get('/api/channelmenus/' + channelId);
};

//메뉴 id로 해당 메뉴를 가져옵니다.
export const getMenu = (menuId: string) => {
  return client.get('/api/menus/' + menuId);
};

//채널아이디와 채널네임이을 쿼리로 보내줘야 해당 채널의 프로덕트들을 가져올 수 있습니다.
export const getProducts = (channelId: string, channelName: string) => {
  return client.get(
    `/api/products?channelNo=${channelId}&channelName=${channelName}`,
  );
};

//프로덕트 id로 해당 프로덕트를 가져옵니다.
export const getProduct = (productId: string) => {
  return client.get('/api/products/' + productId);
};

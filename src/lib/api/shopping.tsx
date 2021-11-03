import client from './client';

export const getAllChannels = () => {
  return client.get('/api/channels');
};

export const getChannelMenu = (channelId: string) => {
  return client.get('/api/channelmenus/' + channelId);
};

export const getMenu = (menuId: string) => {
  return client.get('/api/menus/' + menuId);
};

export const getProducts = (channelId: string) => {
  return client.get('/api/products?channel=' + channelId);
};

export const getProduct = (productId: string) => {
  return client.get('/api/products/' + productId);
};

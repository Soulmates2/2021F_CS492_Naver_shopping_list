import { atom } from 'recoil';

interface product {
  _id: string;
  name: string;
}

export const productState = atom<product[]>({
  key: 'product',
  default: [],
});

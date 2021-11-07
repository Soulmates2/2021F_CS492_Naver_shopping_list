import { atom } from 'recoil';

interface channels {
  _id: string;
  name: string;
}

export const channelState = atom<channels[]>({
  key: 'channelList',
  default: [],
});

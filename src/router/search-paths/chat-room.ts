import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const CHAT_ROOM_KEYWORDS = [
  'chat',
  'チャット',
  'ちゃっと',
  'ルーム',
  'るーむ',
  'room',
  'メッセージ',
  'めっせーじ',
  'message',
  'messe-zi',
  'tyatto',
  'ru-mu',
];

export const chatRoomPath: Path[] = [
  {
    title: 'chat-room',
    href: '/chat-room',
    link: '/chat-room',
    keyword: [...CHAT_ROOM_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
];

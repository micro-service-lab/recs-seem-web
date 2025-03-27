import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const MEMBER_KEYWORDS = [
  'member', 'めんば', 'メンバ', 'menba', '生徒', 'せいと', 'seito', 'student',
  '教員', 'きょういん', 'kyouin', 'teacher', 'staff', '職員', 'しょくいん', 'shokuin',
  'professor', 'user', 'ユーザ', 'ゆーざ', 'yuza'
];


export const memberPath: Path[] = [
  {
    title: 'member-list',
    href: '/member',
    link: '/member',
    keyword: [...MEMBER_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'member-create',
    href: '/member/create',
    link: '/member/create',
    keyword: [...MEMBER_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
];

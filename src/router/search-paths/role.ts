import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const ROLE_KEYWORDS = [
  'role',
  'ro-ru',
  'ロール',
  'ろーる',
  '権限',
  'けんげん',
  'kenngenn',
  'kengenn',
  'permissions',
  'ケンゲン',
  'カンリシャケンゲン',
  'カンリシャ権限',
  'カンリシャけんげん',
  '管理者ケンゲン',
  '管理者権限',
  '管理者けんげん',
  'かんりしゃケンゲン',
  'かんりしゃ権限',
  'かんりしゃけんげん',
  'policy',
  'ポリシー',
  'ぽりしー',
];

export const rolePath: Path[] = [
  {
    title: 'role-list',
    href: '/role',
    link: '/role',
    keyword: [...ROLE_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'role-create',
    href: '/role/create',
    link: '/role/create',
    keyword: [...ROLE_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
];

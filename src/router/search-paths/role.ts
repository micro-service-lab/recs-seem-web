import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const ROLE_KEYWORDS = [
  'roles',
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
];

export const rolePath: Path[] = [
  {
    title: 'role-list',
    href: '/roles',
    link: '/roles',
    keyword: [...ROLE_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
];

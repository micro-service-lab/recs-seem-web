import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const PERMISSION_KEYWORDS = [
  'permission',
  'パーミッション',
  'ぱーみっしょん',
  '権限',
  'けんげん',
  'kengen',
  'pa-misshon',
  'ケンゲン',
  'work',
  'position',
  'ワーク',
  'わーく',
  'ポジション',
  'ぽじしょん',
];

export const permissionPath: Path[] = [
  {
    title: 'permission-list',
    href: '/permission',
    link: '/permission',
    keyword: [...PERMISSION_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'permission-create',
    href: '/permission/create',
    link: '/permission/create',
    keyword: [...PERMISSION_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
];

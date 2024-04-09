import { Path } from '../paths';

const SETTING_KEYWORDS = [
  'settings',
  '設定',
  'せってい',
  'セッテイ',
  'settei',
  'セッティング',
  '編集',
  'ヘンシュウ',
  'へんしゅう',
  'hennsyuu',
  'hensyuu',
  'プロフィール',
  'profile',
  'edit',
  'ぷろふぃーる',
];

export const settingPath: Path[] = [
  {
    title: 'setting',
    href: '/settings',
    link: '/settings',
    keyword: [...SETTING_KEYWORDS],
  },
];

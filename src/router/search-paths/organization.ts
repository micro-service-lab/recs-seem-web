import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const ORGANIZATION_KEYWORDS = [
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

export const organizationPath: Path[] = [
  {
    title: 'organization-list',
    href: '/organization',
    link: '/organization',
    keyword: [...ORGANIZATION_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'organization-create',
    href: '/organization/create',
    link: '/organization/create',
    keyword: [...ORGANIZATION_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
];

import { Path } from '../paths';
import { COMMON_KEYWORDS, COMPANY_KEYWORDS } from './_common';

const MAIN_CLIENT_KEYWORDS = [
  'client',
  '主要',
  '取引先',
  'しゅよう',
  'とりひきさき',
  'syuyou',
  'torihikisaki',
  'シュヨウ',
  'トリヒキサキ',
  'main'
];

export const mainClientPath: Path[] = [
  {
    title: 'main-client-list',
    href: '/company/main-clients',
    link: '/company/main-clients',
    keyword: [...COMPANY_KEYWORDS, ...MAIN_CLIENT_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'main-client-create',
    href: '/company/main-clients/create',
    link: '/company/main-clients/create',
    keyword: [...COMPANY_KEYWORDS, ...MAIN_CLIENT_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
];

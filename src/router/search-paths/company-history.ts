import { Path } from '../paths';
import { COMMON_KEYWORDS, COMPANY_KEYWORDS } from './_common';

const COMPANY_HISTORY_KEYWORDS = [
  'history',
  '沿革',
  'えんかく',
  'エンカク',
  'histories',
  'enkaku',
  'ennkaku',
  '歴史',
  'れきし',
  'レキシ',
  'rekishi',
  'rekisi',
  '歩み',
  'あゆみ',
  'アユミ'
];

export const companyHistoryPath: Path[] = [
  {
    title: 'company-history-list',
    href: '/company/company-histories',
    link: '/company/company-histories',
    keyword: [...COMPANY_KEYWORDS, ...COMPANY_HISTORY_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'company-history-create',
    href: '/company/company-histories/create',
    link: '/company/company-histories/create',
    keyword: [...COMPANY_KEYWORDS, ...COMPANY_HISTORY_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
];

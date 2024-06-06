import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const ORGANIZATION_KEYWORDS = [
  'organization',
  '組織',
  '団体',
  'org',
  'そしき',
  'だんたい',
  'おーがにざえーしょん',
  'おがにざえーしょん',
  'ソシキ',
  'ダンタイ',
  'オーガニゼーション',
  'オガニゼーション',
  'おーがないぜーしょん',
  'おがないぜーしょん',
  'オーガナイゼーション',
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

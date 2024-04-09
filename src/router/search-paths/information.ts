import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const INFORMATION_KEYWORDS = [
  'インフォメーション',
  'いんふぉめーしょん',
  'informatins',
  'news',
  'ニュース',
  'にゅーす',
  'おしらせ',
  'お知らせ',
  'オシラセ',
  'oshirase',
  'osirase',
  'announcement',
  'アナウンス',
  'あなうんす',
  'anaunnsu',
  'anaunsu',
];

export const informationPath: Path[] = [
  {
    title: 'information-list',
    href: '/informations',
    link: '/informations',
    keyword: [...INFORMATION_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'information-create',
    href: '/informations/create',
    link: '/informations/create',
    keyword: [...INFORMATION_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
  {
    title: 'information-category-list',
    href: '/informations/categories',
    link: '/informations/categories',
    keyword: [...INFORMATION_KEYWORDS, ...COMMON_KEYWORDS.list, ...COMMON_KEYWORDS.category],
  },
  {
    title: 'information-category-create',
    href: '/informations/categories/create',
    link: '/informations/categories/create',
    keyword: [...INFORMATION_KEYWORDS, ...COMMON_KEYWORDS.create, ...COMMON_KEYWORDS.category],
  },
];

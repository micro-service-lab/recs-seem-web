import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const MINUTES_KEYWORDS = [
  'minute',
  '議事録',
  'gijiroku',
  'ぎじろく',
  '議事',
  'giji',
  'ぎじ',
  'ギジロク',
  'ギジ',
  'report',
  'レポート',
  'れぽーと',
  '会議',
  'かいぎ',
  'kaigi',
  'meeting',
  'ミーティング',
  'みーてぃんぐ',
  '会議録',
  'かいぎろく',
  'kaigiroku',
];

export const minutesPath: Path[] = [
  {
    title: 'minutes-create',
    href: '/minutes/create',
    link: '/minutes/create',
    keyword: [...MINUTES_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
  {
    title: 'minutes-view',
    href: '/minutes',
    link: '/minutes',
    keyword: [...MINUTES_KEYWORDS, ...COMMON_KEYWORDS.view],
  },
];

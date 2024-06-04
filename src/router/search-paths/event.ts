import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const EVENT_KEYWORDS = [
  'event',
  'イベント',
  '行事',
  'いべんと',
  'ぎょうじ',
  'gyouji',
  'ギョウジ',
  'ibento',
];

export const eventPath: Path[] = [
  {
    title: 'event-create',
    href: '/event/create',
    link: '/event/create',
    keyword: [...EVENT_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
];

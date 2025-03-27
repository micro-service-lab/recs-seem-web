import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const CALENDER_KEYWORDS = [
  'calender',
  'カレンダ',
  'calendar',
  'かれんだ',
  'karenda',
  'yotei',
  '予定',
  'よてい',
  'schedule',
  'スケジュール',
  'すけじゅーる',
  'sukeju-ru',
  'event',
  'イベント',
  '行事',
  'いべんと',
  'ぎょうじ',
  'gyouji',
  'ギョウジ',
  'ibento',
];

export const calenderPath: Path[] = [
  {
    title: 'calender',
    href: '/calender',
    link: '/calender',
    keyword: [...CALENDER_KEYWORDS, ...COMMON_KEYWORDS.view],
  },
];

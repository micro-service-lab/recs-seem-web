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
];

export const calenderPath: Path[] = [
  {
    title: 'calender-view',
    href: '/calender',
    link: '/calender',
    keyword: [...CALENDER_KEYWORDS, ...COMMON_KEYWORDS.view],
  },
];

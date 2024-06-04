import { Path } from '../paths';

const ATTENDANCE_KEYWORDS = [
  'attendance',
  '出席',
  'しゅっせき',
  'shuutseki',
  'シュッセキ',
  '出勤',
  'しゅっきん',
  'shuukkin',
  'シュッキン',
  '出社',
  'しゅっしゃ',
  'shussha',
  'シュッシャ',
  '出勤簿',
  'しゅっきんぼ',
  'shuukkinbo',
  'シュッキンボ',
  'attend'
];

const ABSENCE_FORM_KEYWORDS = [
  'absence-form',
  'absence',
  '欠席',
  'けっせき',
  'kesseki',
  'ケッセキ',
  'absent',
  '届け',
  'とどけ',
  '休み',
  'やすみ',
  '休暇',
  'きゅうか',
  'kyuuka',
  'キュウカ',
  '遅刻',
  'ちこく',
  'chikoku',
  'チコク',
  'late',
  'arrive',
  'arrival',
  '遅れ',
  'おくれ',
  'okure',
  'オクレ',
  '早退',
  'そうたい',
  'soutai',
  'ソウタイ',
  'early',
  'leave',
  'leaving',
  '早く',
  'はやく',
  'hayaku',
  'ハヤク',
];

export const attendancePath: Path[] = [
  {
    title: 'absence-form',
    href: '/attendance/absence-form',
    link: '/attendance/absence-form',
    keyword: [...ATTENDANCE_KEYWORDS, ...ABSENCE_FORM_KEYWORDS],
  },
];
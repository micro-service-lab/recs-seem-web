import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const CONTACT_KEYWORDS = [
  'contacts',
  'コンタクト',
  'kontakuto',
  'お問い合わせ',
  'おといあわせ',
  'オトイアワセ',
  '御問い合わせ',
  '御といあわせ',
  'otoiawase'
];

export const contactPath: Path[] = [
  {
    title: 'contact-list',
    href: '/contacts',
    link: '/contacts',
    keyword: [...CONTACT_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'contact-category-list',
    href: '/contacts/categories',
    link: '/contacts/categories',
    keyword: [...CONTACT_KEYWORDS, ...COMMON_KEYWORDS.list, ...COMMON_KEYWORDS.category],
  },
  {
    title: 'contact-category-create',
    href: '/contacts/categories/create',
    link: '/contacts/categories/create',
    keyword: [...CONTACT_KEYWORDS, ...COMMON_KEYWORDS.create, ...COMMON_KEYWORDS.category],
  },
];

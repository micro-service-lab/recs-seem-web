import { Path } from '../paths';
import { COMMON_KEYWORDS } from './_common';

const ADMIN_KEYWORDS = ['管理者', 'かんりしゃ', 'カンリシャ', 'admins', 'administrators', 'kanrisya', 'kannrisya'];

export const adminPath: Path[] = [
  {
    title: 'admin-list',
    href: '/',
    link: '/',
    keyword: [...ADMIN_KEYWORDS, ...COMMON_KEYWORDS.list],
  },
  {
    title: 'admin-create',
    href: '/create',
    link: '/create',
    keyword: [...ADMIN_KEYWORDS, ...COMMON_KEYWORDS.create],
  },
];

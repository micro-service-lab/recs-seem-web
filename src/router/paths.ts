import { adminPath, companyHistoryPath, contactPath, informationPath, mainClientPath, rolePath, settingPath } from './search-paths';

export type Path = {
  title: string;
  href: (() => string) | string;
  link: string;
  keyword: string[];
};

export const paths: Path[] = [...adminPath, ...rolePath, ...informationPath, ...contactPath, ...mainClientPath, ...companyHistoryPath, ...settingPath];

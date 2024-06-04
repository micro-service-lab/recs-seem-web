import {
  memberPath,
  chatRoomPath,
  eventPath,
  attendancePath,
  rolePath,
  calenderPath,
  locationInformationPath,
  organizationPath,
  permissionPath,
  minutesPath,
  settingPath,
} from "./search-paths";

export type Path = {
  title: string;
  href: (() => string) | string;
  link: string;
  keyword: string[];
};

export const paths: Path[] = [
  ...memberPath,
  ...rolePath,
  ...attendancePath,
  ...chatRoomPath,
  ...eventPath,
  ...calenderPath,
  ...locationInformationPath,
  ...organizationPath,
  ...permissionPath,
  ...minutesPath,
  ...settingPath,
];

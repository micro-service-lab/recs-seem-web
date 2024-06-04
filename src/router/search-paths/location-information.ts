import { Path } from "../paths";
import { COMMON_KEYWORDS } from "./_common";

const LOCATION_INFORMATION_KEYWORDS = [
  "location",
  "場所",
  "ロケーション",
  "ばしょ",
  "ろけーしょん",
  "rokeisyon",
  "basho",
  "place",
  "プレイス",
  "ぷれいす",
  "pureisu",
  "position",
  "ポジション",
  "ぽじしょん",
  "pojishon",
];

export const locationInformationPath: Path[] = [
  {
    title: "location-information-history",
    href: "/location-information/history",
    link: "/location-information/history",
    keyword: [...LOCATION_INFORMATION_KEYWORDS, ...COMMON_KEYWORDS.history],
  },
];

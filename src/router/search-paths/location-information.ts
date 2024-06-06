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
    title: "location-information",
    href: "/location-information",
    link: "/location-information",
    keyword: [...LOCATION_INFORMATION_KEYWORDS, ...COMMON_KEYWORDS.history],
  },
];

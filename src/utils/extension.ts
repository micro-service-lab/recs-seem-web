type FileType =
  | "3d"
  | "acrobat"
  | "audio"
  | "binary"
  | "code"
  | "compressed"
  | "document"
  | "drive"
  | "font"
  | "image"
  | "presentation"
  | "settings"
  | "spreadsheet"
  | "vector"
  | "video";

interface FileInfo {
  type: FileType;
  color: string;
  accentColor: string;
}

const extensionToFileInfoMap: { [key: string]: FileInfo } = {
  // 3D files
  "3ds": { type: "3d", color: "#FF5733", accentColor: "#FF4500" },
  obj: { type: "3d", color: "#FF5733", accentColor: "#FF4500" },
  fbx: { type: "3d", color: "#FF5733", accentColor: "#FF4500" },
  stl: { type: "3d", color: "#FF5733", accentColor: "#FF4500" },

  // Acrobat files
  pdf: { type: "acrobat", color: "#FF0000", accentColor: "#B22222" },

  // Audio files
  mp3: { type: "audio", color: "#008000", accentColor: "#006400" },
  wav: { type: "audio", color: "#008000", accentColor: "#006400" },
  flac: { type: "audio", color: "#008000", accentColor: "#006400" },
  aac: { type: "audio", color: "#008000", accentColor: "#006400" },
  ogg: { type: "audio", color: "#008000", accentColor: "#006400" },
  m4a: { type: "audio", color: "#008000", accentColor: "#006400" },

  // Binary files
  exe: { type: "binary", color: "#F2F2F2", accentColor: "#333333" },
  dll: { type: "binary", color: "#F2F2F2", accentColor: "#333333" },
  bin: { type: "binary", color: "#F2F2F2", accentColor: "#333333" },
  iso: { type: "binary", color: "#F2F2F2", accentColor: "#333333" },

  // Code files
  js: { type: "code", color: "#F0DB4F", accentColor: "#FFD700" },
  ts: { type: "code", color: "#007ACC", accentColor: "#00599C" },
  java: { type: "code", color: "#007396", accentColor: "#00599C" },
  py: { type: "code", color: "#306998", accentColor: "#1E4C73" },
  cpp: { type: "code", color: "#00599C", accentColor: "#004182" },
  cs: { type: "code", color: "#9A4993", accentColor: "#803576" },
  rb: { type: "code", color: "#CC342D", accentColor: "#B22222" },

  // Markup and stylesheet files
  html: { type: "code", color: "#E34C26", accentColor: "#D2691E" },
  css: { type: "code", color: "#264DE4", accentColor: "#1E90FF" },
  xml: { type: "code", color: "#8A2BE2", accentColor: "#4B0082" },
  json: { type: "code", color: "#A1ABAE", accentColor: "#708090" },

  // Compressed files
  zip: { type: "compressed", color: "#FFCC00", accentColor: "#FFD700" },
  rar: { type: "compressed", color: "#FFCC00", accentColor: "#FFD700" },
  "7z": { type: "compressed", color: "#FFCC00", accentColor: "#FFD700" },
  tar: { type: "compressed", color: "#FFCC00", accentColor: "#FFD700" },
  gz: { type: "compressed", color: "#FFCC00", accentColor: "#FFD700" },

  // Document files
  doc: { type: "document", color: "#3B5998", accentColor: "#2F4F4F" },
  docx: { type: "document", color: "#3B5998", accentColor: "#2F4F4F" },
  txt: { type: "document", color: "#F2F2F2", accentColor: "#696969" },
  rtf: { type: "document", color: "#3B5998", accentColor: "#2F4F4F" },
  odt: { type: "document", color: "#3B5998", accentColor: "#2F4F4F" },

  // Drive files (Google Drive)
  gdrive: { type: "drive", color: "#4285F4", accentColor: "#0F9D58" },

  // Font files
  ttf: { type: "font", color: "#F2F2F2", accentColor: "#808080" },
  otf: { type: "font", color: "#F2F2F2", accentColor: "#808080" },
  woff: { type: "font", color: "#F2F2F2", accentColor: "#808080" },
  woff2: { type: "font", color: "#F2F2F2", accentColor: "#808080" },

  // Image files
  jpg: { type: "image", color: "#FFD700", accentColor: "#FFA500" },
  jpeg: { type: "image", color: "#FFD700", accentColor: "#FFA500" },
  png: { type: "image", color: "#FFD700", accentColor: "#FFA500" },
  gif: { type: "image", color: "#FFD700", accentColor: "#FFA500" },
  bmp: { type: "image", color: "#FFD700", accentColor: "#FFA500" },
  tiff: { type: "image", color: "#FFD700", accentColor: "#FFA500" },
  ico: { type: "image", color: "#FFD700", accentColor: "#FFA500" },
  webp: { type: "image", color: "#FFD700", accentColor: "#FFA500" },

  // Presentation files
  ppt: { type: "presentation", color: "#D24726", accentColor: "#FF4500" },
  pptx: { type: "presentation", color: "#D24726", accentColor: "#FF4500" },
  odp: { type: "presentation", color: "#D24726", accentColor: "#FF4500" },

  // Settings files
  cfg: { type: "settings", color: "#6A737D", accentColor: "#808080" },
  ini: { type: "settings", color: "#6A737D", accentColor: "#808080" },
  env: { type: "settings", color: "#6A737D", accentColor: "#808080" },
  yaml: { type: "settings", color: "#6A737D", accentColor: "#808080" },
  yml: { type: "settings", color: "#6A737D", accentColor: "#808080" },

  // Spreadsheet files
  xls: { type: "spreadsheet", color: "#207245", accentColor: "#228B22" },
  xlsx: { type: "spreadsheet", color: "#207245", accentColor: "#228B22" },
  ods: { type: "spreadsheet", color: "#207245", accentColor: "#228B22" },
  csv: { type: "spreadsheet", color: "#207245", accentColor: "#228B22" },

  // Vector files
  svg: { type: "vector", color: "#FF6347", accentColor: "#FF4500" },
  ai: { type: "vector", color: "#FF6347", accentColor: "#FF4500" },
  eps: { type: "vector", color: "#FF6347", accentColor: "#FF4500" },
  psd: { type: "vector", color: "#FF6347", accentColor: "#FF4500" },

  // Video files
  mp4: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  avi: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  mkv: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  mov: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  wmv: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  flv: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  webm: { type: "video", color: "#FF4500", accentColor: "#DC143C" },

  // Additional files
  mpg: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  mpeg: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  "3gp": { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  m4v: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
  vob: { type: "video", color: "#FF4500", accentColor: "#DC143C" },
};

export function getFileType(extension: string): FileInfo {
  return (
    extensionToFileInfoMap[extension] || {
      type: "document",
      color: "#F2F2F2",
      accentColor: "#696969",
    }
  );
}

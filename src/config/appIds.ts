export const appIds = [
  "finder",
  "internet-explorer",
  "chats",
  "textedit",
  "paint",
  "photo-booth",
  "minesweeper",
  "videos",
  "ipod",
  "terminal",
  "applet-viewer",
  "control-panels",
] as const;

export type AppId = (typeof appIds)[number];

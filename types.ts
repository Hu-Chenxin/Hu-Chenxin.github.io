export enum ProjectCategory {
  All = 'All',
  Game = 'Game',
  AI = 'AI Product',
  Art = 'Art',
  Architecture = 'Architecture',
  Research = 'Research',
}

export type ProjectMediaType = 'image' | 'video' | 'pdf';

export interface ProjectMedia {
  type: ProjectMediaType;
  url: string;
  thumbnail?: string; // Optional thumbnail for video/pdf
  label?: string; // Caption shown under the media frame
}

/** 文本中的 **加粗** 会被 RichText 渲染为 <b> */
export interface Bullet {
  label?: string;
  text: string;
}

/** 精选卡内的作品链接，如平台上线的单款小游戏 */
export interface ProjectLink {
  label: string; // 作品名
  url: string;
  genre?: string; // 品类小标，如「3D 模拟经营」
  cover?: string; // 按钮背景图
  coverTone?: 'light' | 'dark'; // 浅底截图需压得更暗，保证白字可读
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  date: string;
  // Allow a single media item or an array of media items so a project
  // can show multiple assets (e.g., video + PDF) in the modal.
  media?: ProjectMedia | ProjectMedia[];
  tags: string[];
  link?: string; // External link (e.g., GitHub, Itch.io)

  /** 精选项目：以大卡形式出现在「精选项目」区，并从档案网格中排除 */
  featured?: boolean;
  org?: string; // 封面角标，如「腾讯 IEG · 光子工作室群 · 在研」
  role?: string; // 承担角色，如「系统设计 · 叙事 AI 管线」
  period?: string; // 展示用时间区间，如「2026.04 至今」
  bullets?: Bullet[];
  links?: ProjectLink[]; // 卡内作品链接组
  coverWord?: string; // 无图封面上的字母，如 JRPG
  coverOrbs?: string[]; // 无图封面上的渐变球，如 ['orb-c4','orb-c6']
  coverMark?: string; // 封面上散落的品牌 logo
  cover?: string; // 精选卡封面图，优先于 media.thumbnail
  coverFit?: 'cover' | 'contain';
}

export interface Contact {
  label: string;
  href: string;
  external?: boolean;
}

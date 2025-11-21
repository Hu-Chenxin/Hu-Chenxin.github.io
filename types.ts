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
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  date: string;
  // Allow a single media item or an array of media items so a project
  // can show multiple assets (e.g., video + PDF) in the modal.
  media: ProjectMedia | ProjectMedia[];
  tags: string[];
  link?: string; // External link (e.g., GitHub, Itch.io)
}
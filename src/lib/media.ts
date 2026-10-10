export interface MediaItem {
  video?: string;
  image?: string;
  caption?: string;
}

/** 视频海报：未指定 image 时使用同名 `xxx-poster.webp`（public/media/ 下） */
export const posterOf = (m: MediaItem) =>
  m.image ??
  (m.video && !/^https?:/.test(m.video) ? m.video.replace(/\.(mp4|webm|mov|m4v)$/i, '-poster.webp') : undefined);

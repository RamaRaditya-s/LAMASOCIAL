export type Video = {
  id: number;
  title: string;
  url: string;
  thumb: string;
  uploader: string;
  views: number;
  duration: string;   // format time (MM:SS) dalam MySQL cocok pakai string
  created_at: string; // datetime dari MySQL → string
};

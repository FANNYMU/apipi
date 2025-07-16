export interface InfoSpotify {
  id: string;
  type: string;
  name: string;
  image: string;
  artists: string;
  duration_ms: number;
  gid: number;
}

export interface DownSpotify {
  erorr: boolean;
  url: string;
}

export interface SpotifyDownloadResult {
  info: InfoSpotify;
  url: string;
}

export interface SpotifyHeaders {
  [key: string]: string | string[] | undefined;
  "set-cookie"?: string[];
}

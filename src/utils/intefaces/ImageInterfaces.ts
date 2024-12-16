export interface ImageSearchParams {
  [key: string]: string | number | boolean; // Clave-valor flexible
}

export interface ImageSearchResponse {
  status: string;
  message: string;
  data: ImageData[];
  Pagination: Pagination
}

interface ImageOwner {
  id?: string;
  username: string;
  realname: string;
  location?: string;
}

export interface ImageData {
  id: string;
  title: string;
  owner: ImageOwner;
  description: string;
  tags?: string[];
  server: string;
  url_p: string;
  url_m: string;
  url_g: string;
}

interface Pagination {
  page: number;
  per_page: number;
  total_pages: number;
  total_photos: number;
}

// Interfaz de la información de la imagen individual
export interface ImageInfo {
  status: string;
  message: string;
  data: ImageInfoData
}

export interface ImageInfoData {
  id: string;
  title: string;
  description: string;
  owner: ImageOwner;
  dates: ImageInfoDates;
  comments: ImageInfoComments[];
  tags: string[];
  url_p: string;
  url_m: string;
  url_g: string;
}

interface ImageInfoDates {
  posted: string;
  taken: string;
  takengranularity: number;
  takenunknown: string;
  lastupdate: string;
}

interface ImageInfoComments {
  id: string;
  author: string;
  author_is_deleted: number;
  authorname: string;
  iconserver: string;
  iconfarm: string;
  datecreate: string;
  permalink: string;
  path_alias: string;
  realname: string;
  _content: string;
}
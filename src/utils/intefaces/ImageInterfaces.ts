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
  id: string;
  username?: string;
  realname?: string;
}

export interface ImageData {
  id: string;
  title: string;
  owner: ImageOwner;
  description?: string;
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
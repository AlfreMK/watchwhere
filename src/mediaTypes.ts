export const MEDIA_TYPES = {
  MOVIE: 'movie',
  TV_SHOW: 'tv',
} as const

export type MediaType = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]

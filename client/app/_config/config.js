export const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

export const ALLOWED_SEARCH_PARAMS_NAMES = [
  'text',
  'author',
  'category',
  'limit',
  'offset',
]

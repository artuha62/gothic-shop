import { transliterate } from './NormalizeSearch'

export function generateSlug(text: string): string {
  return transliterate(text)
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
}

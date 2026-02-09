export const getImageUrl = (path: string): string => {
  if (!path) return ''

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  return `${apiUrl}/${cleanPath}`
}

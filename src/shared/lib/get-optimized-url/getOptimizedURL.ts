export const getOptimizedURL = (url: string, transforms: string) => {
  if (!url.includes('cloudinary.com')) return url

  return url.replace('/upload/', `/upload/${transforms}/`)
}

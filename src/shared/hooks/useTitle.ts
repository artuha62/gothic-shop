import { useEffect } from 'react'

const APP_TITLE = 'Gothic Shop'

export const useTitle = (pageTitle?: string) => {
  useEffect(() => {
    document.title = pageTitle ? `${APP_TITLE} — ${pageTitle}` : APP_TITLE
  }, [pageTitle])
}

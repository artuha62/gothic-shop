import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { Button } from '@/shared/ui/button'
import styles from './ProfilePage.module.scss'

const ProfilePage = () => {
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className={styles.content}>
      <div className={styles.accountWrapper}>
        <aside className={styles.sidebar}></aside>
        <Button onClick={logout}>Выйти</Button>
      </div>
    </div>
  )
}

export default ProfilePage

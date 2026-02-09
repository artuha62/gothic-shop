import { useAuthStore } from '@/entities/auth/store/useAuthStore'
import { Button } from '@/shared/ui/button'
import styles from './ProfilePage.module.scss'

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className={styles.content}>
      <div className={styles.accountWrapper}>
        <aside className={styles.sidebar}>
          <div>{user?.email}</div>
          <div>{user?.id}</div>
        </aside>
        <Button onClick={logout}>Выйти</Button>
      </div>
    </div>
  )
}

export default ProfilePage

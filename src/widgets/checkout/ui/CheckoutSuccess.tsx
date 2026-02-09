import { Button } from '@/shared/ui/button'
import { Check } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import styles from './CheckoutSuccess.module.scss'

interface CheckoutSuccessProps {
  orderId: string
}

export const CheckoutSuccess = ({ orderId }: CheckoutSuccessProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className={styles.successWrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Заказ успешно оформлен!</h2>
        <Check size={30} />
      </div>
      <div className={styles.descriptionWrapper}>
        <p className={styles.orderId}>
          Номер вашего заказа: <strong>{orderId}</strong>
        </p>
        <p className={styles.description}>
          Мы отправили подтверждение на указанный email.
        </p>
        <p className={styles.description}>
          Наш менеджер свяжется с вами в ближайшее время.
        </p>
      </div>
      <Button onClick={() => navigate('/catalog')} variant="black" size="lg">
        Вернуться в каталог
      </Button>
    </div>
  )
}

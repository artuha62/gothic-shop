import { SendLoginCodeForm } from '@/features/auth/send-login-code'
import { VerifyLoginCodeForm } from '@/features/auth/verify-login-code'
import { useScrollLock } from '@/shared/hooks/useScrollLock'
import { IconButton } from '@/shared/ui/icon-button'
import { useLoginModal } from '@/widgets/login-modal/model/useLoginModal'
import { useModalOnKeyboard } from '@/widgets/login-modal/model/useModalOnKeyboard'
import { useLoginModalStore } from '@/widgets/login-modal/store/useLoginModalStore'
import { X } from 'lucide-react'
import styles from './LoginModal.module.scss'

export const LoginModal = () => {
  const isLoginModalOpen = useLoginModalStore((state) => state.isLoginModalOpen)
  const closeLoginModal = useLoginModalStore((state) => state.closeLoginModal)

  const { loginData, step, goToCodeStep, goToEmailStep } =
    useLoginModal(isLoginModalOpen)

  useScrollLock(isLoginModalOpen)
  useModalOnKeyboard(isLoginModalOpen, closeLoginModal)

  if (!isLoginModalOpen) return null

  return (
    <div className={styles.loginModal} role="dialog" aria-modal="true">
      <div
        className={styles.overlay}
        onClick={closeLoginModal}
        aria-label="Закрыть модальное окно"
      />
      <div className={styles.content}>
        {step === 'email' ? (
          <SendLoginCodeForm onSuccess={goToCodeStep} />
        ) : (
          <VerifyLoginCodeForm
            email={loginData.email}
            rememberMe={loginData.rememberMe}
            onSuccess={closeLoginModal}
            onBack={goToEmailStep}
          />
        )}

        <IconButton
          onClick={closeLoginModal}
          variant="default"
          className={styles.closeButton}
          aria-label="Закрыть окно авторизации"
        >
          <X strokeWidth={0.75} size={36} />
        </IconButton>
      </div>
    </div>
  )
}

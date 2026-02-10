import { useEffect, useState } from 'react'

type LoginStep = 'email' | 'code'

interface LoginData {
  email: string
  rememberMe: boolean
}

export const useLoginModal = (isOpen: boolean) => {
  const [step, setStep] = useState<LoginStep>('email')
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    rememberMe: false,
  })

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setStep('email')
        setLoginData({ email: '', rememberMe: false })
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  const goToCodeStep = (email: string, rememberMe: boolean) => {
    setLoginData({ email, rememberMe })
    setStep('code')
  }

  const goToEmailStep = () => {
    setStep('email')
  }

  return {
    step,
    loginData,
    goToCodeStep,
    goToEmailStep,
  }
}

import { create } from 'zustand'

const PROMOCODES = {
  SALE10: 10,
  WINTER20: 20,
  GIFT5: 5,
  ARTUHA62: 62,
} as const

type PromoCode = keyof typeof PROMOCODES

interface PromoCodeStore {
  code: PromoCode | null
  discount: number
  applyPromoCode: (code: string) => boolean
  clearPromoCode: () => void
}

export const usePromoCodeStore = create<PromoCodeStore>((set) => ({
  code: null,
  discount: 0,

  applyPromoCode: (inputCode: string) => {
    const upperCode = inputCode.toUpperCase() as PromoCode

    if (upperCode in PROMOCODES) {
      set({
        code: upperCode,
        discount: PROMOCODES[upperCode],
      })
      return true
    }

    return false
  },

  clearPromoCode: () => {
    set({
      code: null,
      discount: 0,
    })
  },
}))

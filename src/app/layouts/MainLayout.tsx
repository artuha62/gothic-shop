import { PromoBanner } from '@/widgets/promo-banner'
import { Header } from '@/widgets/header'
import { Outlet } from 'react-router'
import { CartDrawer } from '@/features/cart'

const MainLayout = () => {
  return (
    <>
      <CartDrawer />
      <PromoBanner variant="black" padding="sm">
        /// БЕСПЛАТНАЯ ДОСТАВКА ОТ 10 000 ₽ ///
      </PromoBanner>
      <Header />
      <main>
        <Outlet />
      </main>
      <PromoBanner variant="green" padding="lg" repeat={5}>
        /// -30% ПО ПРОМОКОДУ ARTUHA62 ///
      </PromoBanner>
    </>
  )
}

export default MainLayout

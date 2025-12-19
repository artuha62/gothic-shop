import { PromoBanner } from '@/widgets/promo-banner'
import { Header } from '@/widgets/header'
import { Outlet } from 'react-router'
import { CartDrawer } from '@/features/cart'
import { Footer } from '@/widgets/footer'

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
        /// -62% ПО ПРОМОКОДУ ARTUHA62 ///
      </PromoBanner>
      <Footer />
    </>
  )
}

export default MainLayout

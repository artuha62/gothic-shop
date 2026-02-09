import { PromoBanner } from '@/shared/ui/promo-banner'
import { CartDrawer } from '@/widgets/cart-drawer'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { LoginModal } from '@/widgets/login-modal'
import { SearchDropdown } from '@/widgets/search-dropdown'
import { Outlet, useLocation } from 'react-router'

const MainLayout = () => {
  const location = useLocation()
  const isMainPage = location.pathname === '/'

  return (
    <>
      <CartDrawer />
      <SearchDropdown />
      <LoginModal />

      <PromoBanner variant="black" padding="sm" repeat={5}>
        /// БЕСПЛАТНАЯ ДОСТАВКА ОТ 10 000 ₽ ///
      </PromoBanner>
      <Header variant={isMainPage ? 'light' : 'default'} />
      <main className="container">
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

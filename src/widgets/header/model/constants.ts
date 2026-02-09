export const desktopMenu = [
  { title: 'Ботинки', to: '/catalog?category=boots' },
  { title: 'Сапоги', to: '/catalog?category=highboots' },
  { title: 'Туфли', to: '/catalog?category=sandals' },
  { title: 'О бренде', to: '/about' },
  { title: 'Покупателям', to: '/contacts' },
]

export const mobileMenu = [
  { title: 'Каталог', to: '/catalog' },
  { title: 'Избранное', to: '/favorites' },
  { title: 'New', to: '/' },
  ...desktopMenu,
]

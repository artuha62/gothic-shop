type FooterLink = {
  label: string
  to: string
}

export const footerMenus: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: 'КАТАЛОГ',
    links: [
      { label: 'Ботинки', to: '/catalog?category=boots' },
      { label: 'Сапоги', to: '/catalog?category=highboots' },
      { label: 'Туфли', to: '/catalog?category=sandals' },
    ],
  },
  {
    title: 'О БРЕНДЕ',
    links: [
      { label: 'Миссия бренда', to: '/about' },
      { label: 'Наше комьюнити', to: '/community' },
    ],
  },
  {
    title: 'ПОКУПАТЕЛЯМ',
    links: [
      { label: 'Оплата', to: '/payment' },
      { label: 'Доставка', to: '/delivery' },
      { label: 'Возврат', to: '/return' },
      { label: 'Политика конфиденциальности', to: '/privacy' },
      { label: 'Публичная оферта', to: '/offer' },
    ],
  },
]

export const contacts = {
  email: 'helloworld(print)@gmail.com',
  telegramUrl: 'https://t.me/your_account',
}

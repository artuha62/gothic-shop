import { Button } from '@/shared/ui/button'
import { RiTelegram2Fill } from 'react-icons/ri'
import { Link } from 'react-router'
import { contacts, footerMenus } from './constants'
import styles from './Footer.module.scss'

const Footer = () => {
  const { telegramUrl, email } = contacts
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <h2 className={styles.title}>ХОЧЕШЬ СТАТЬ ЧАСТЬЮ КОМЬЮНИТИ?</h2>
          <div className={styles.description}>
            <p>// Только секретная информация, без спама.</p>
          </div>
          <Button
            as="a"
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            variant="green"
            size="lg"
            className={styles.tgButton}
          >
            <RiTelegram2Fill size={24} />
            <span>ПОДКЛЮЧИТЬСЯ</span>
          </Button>
        </div>

        <div className={styles.main}>
          <div className={styles.logo}>
            <Link to="/catalog" aria-label="Перейти в каталог">
              <img src="/images/logo-white.png" alt="Логотип" />
            </Link>
          </div>

          <nav className={styles.menus} aria-label="Навигация в футере">
            {footerMenus.map(({ title, links }) => (
              <div key={title} className={styles.menu}>
                <h3 className={styles.menuTitle}>{title}</h3>
                <ul className={styles.list}>
                  {links.map(({ label, to }) => (
                    <li key={label} className={styles.item}>
                      <Link className={styles.link} to={to}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={styles.contacts}>
              <h3 className={styles.menuTitle}>КОНТАКТЫ</h3>
              <a className={styles.email} href={`mailto:${email}`}>
                {email}
              </a>
              <Button
                as="a"
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                variant="tsgreen"
                className={styles.tgButton}
              >
                Написать в тг
              </Button>
            </div>
          </nav>
        </div>

        <div className={`${styles.bottom} container`}>
          <div className={styles.copyright}>
            <div className={styles.requisites}>
              ООО «ARTUHA62», ИНН 626262, ОГРН 123456789
            </div>
            <div className={styles.rights}>© Все права НЕ защищены</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

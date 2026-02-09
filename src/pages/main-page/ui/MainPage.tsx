import styles from './MainPage.module.scss'

export const MainPage = () => {
  return (
    <>
      <h1 className="visually-hidden">Главная страница</h1>
      <section className={styles.hero}>
        <div className={styles.background}>
          <img
            src="/images/main.webp"
            alt="Девушка в сапогах"
            width="1446"
            height="1080"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>
    </>
  )
}

import styles from './MainPage.module.scss'

const MainPage = () => {
  return (
    <>
      <h1 className="visually-hidden">Главная страница</h1>
      <section className={styles.hero}>
        <div className={styles.background}></div>
      </section>
    </>
  )
}

export default MainPage

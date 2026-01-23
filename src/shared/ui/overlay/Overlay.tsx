import styles from './Overlay.module.scss'

interface OverlayProps {
  onClick?: () => void
}

const Overlay = ({ onClick }: OverlayProps) => {
  return <div className={styles.overlay} onClick={onClick}></div>
}

export default Overlay

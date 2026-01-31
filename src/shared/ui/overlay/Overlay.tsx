import styles from './Overlay.module.scss'

interface OverlayProps {
  onClick?: () => void
}

export const Overlay = ({ onClick }: OverlayProps) => {
  return <div className={styles.overlay} onClick={onClick}></div>
}

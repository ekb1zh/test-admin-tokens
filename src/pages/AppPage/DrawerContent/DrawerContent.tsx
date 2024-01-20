import { forwardRef } from 'react'
import { DrawerContentProps } from 'src/pages/AppPage/DrawerContent/types'
import styles from 'src/pages/AppPage/DrawerContent/DrawerContent.module.scss'

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (_, ref) => {
    return <div ref={ref} className={styles.Root}></div>
  },
)

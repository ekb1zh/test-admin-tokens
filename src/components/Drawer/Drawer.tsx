import { forwardRef } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

import { DrawerProps } from 'src/components/Drawer/types'
import styles from 'src/components/Drawer/Drawer.module.scss'

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ isOpen, onClose, children }, ref) => {
    return createPortal(
      <div ref={ref} className={styles.Root}>
        <div className={clsx(isOpen && styles.Backdrop)} onClick={onClose} />
        <div className={clsx(styles.Sidebar, isOpen && styles.Sidebar_open)}>
          {children}
        </div>
      </div>,
      document.body,
    )
  },
)

import { forwardRef } from 'react'

import { ArrowButtonProps } from 'src/components/Table/Pagination/ArrowButton/types'
import styles from 'src/components/Table/Pagination/ArrowButton/ArrowButton.module.scss'

export const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ onClick, disabled, children }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={styles.Root}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
  },
)

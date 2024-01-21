import { forwardRef } from 'react'
import clsx from 'clsx'

import { CardProps } from 'src/components/Card/types'
import styles from 'src/components/Card/Card.module.scss'

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.Root, className)}>
        {children}
      </div>
    )
  },
)

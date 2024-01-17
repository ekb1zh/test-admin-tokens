import { forwardRef } from 'react'

import { CardProps } from 'src/components/Card/types'
import styles from 'src/components/Card/Card.module.scss'

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children }, ref) => {
    const className = styles.Root

    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  },
)

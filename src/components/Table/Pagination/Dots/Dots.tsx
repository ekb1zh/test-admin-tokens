import { forwardRef } from 'react'

import Typography from 'src/components/Typography'
import styles from 'src/components/Table/Pagination/Dots/Dots.module.scss'

export const Dots = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={styles.Root}>
      <Typography.Text type='body-m-medium'>....</Typography.Text>
    </div>
  )
})

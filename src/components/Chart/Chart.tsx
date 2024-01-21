import { forwardRef } from 'react'

import Typography from 'src/components/Typography'
import styles from 'src/components/Chart/Chart.module.scss'

export const Chart = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={styles.Root}>
      <Typography.Text type='body-m-medium' className={styles.Text}>
        Здесь может быть ваша реклама 🤘
      </Typography.Text>
    </div>
  )
})

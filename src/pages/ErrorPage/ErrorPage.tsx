import { FC } from 'react'

import styles from 'src/pages/ErrorPage/ErrorPage.module.scss'

export const ErrorPage: FC = () => {
  return (
    <div className={styles.Root}>
      <h1>Error page</h1>
    </div>
  )
}

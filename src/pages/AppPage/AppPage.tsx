import { FC } from 'react'

import Header from 'src/components/Header'
import Pagination from 'src/components/Table/Pagination'
import styles from 'src/pages/AppPage/AppPage.module.scss'

export const AppPage: FC = () => {
  return (
    <div className={styles.Root}>
      <Header />
      <Pagination />
    </div>
  )
}

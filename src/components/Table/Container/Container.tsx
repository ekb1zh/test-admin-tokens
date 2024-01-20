import { forwardRef } from 'react'
import clsx from 'clsx'

import { useTableContext } from 'src/components/Table/context'
import Columns from 'src/components/Table/Columns'
import Rows from 'src/components/Table/Rows'
import Pagination from 'src/components/Table/Pagination'
import styles from 'src/components/Table/Container/Container.module.scss'

export const Container = forwardRef<HTMLDivElement>((_, ref) => {
  const { className, pagination } = useTableContext()

  return (
    <div ref={ref} className={clsx(styles.Root, className)}>
      <Columns />
      <Rows />

      {pagination && (
        <div className={styles.Footer}>
          <Pagination />
        </div>
      )}
    </div>
  )
})

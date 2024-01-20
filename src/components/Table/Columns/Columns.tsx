import { forwardRef } from 'react'
import clsx from 'clsx'

import Typography from 'src/components/Typography'
import Icon from 'src/components/Icon'
import { useTableContext } from 'src/components/Table/context'
import styles from 'src/components/Table/Columns/Columns.module.scss'

export const Columns = forwardRef<HTMLDivElement>((_, ref) => {
  const { columns, sorting } = useTableContext()

  const onClickSort = (columnIndex: number) => () => {
    if (sorting) {
      const { state, setState } = sorting!
      const mode = state.mode === 'asc' ? 'desc' : 'asc'
      setState({
        columnIndex,
        mode,
      })
    }
  }

  return (
    <div ref={ref} className={styles.Root}>
      {columns.map((column, columnIndex) => {
        const content = (
          <Typography.Text type='body-s-medium' className={styles.CellContent}>
            {column.columnLabel}
          </Typography.Text>
        )

        const isActiveSort = sorting?.state.columnIndex === columnIndex

        const icon = isActiveSort ? (
          sorting.state.mode === 'asc' ? (
            <Icon.ArrowNarrowDown />
          ) : (
            <Icon.ArrowNarrowUp />
          )
        ) : null

        return column.sortRows ? (
          <button
            key={columnIndex}
            type='button'
            className={clsx(styles.Cell, styles.CellSortButton)}
            onClick={onClickSort(columnIndex)}
          >
            {content}
            {icon}
          </button>
        ) : (
          <div key={columnIndex} className={styles.Cell}>
            {content}
          </div>
        )
      })}
    </div>
  )
})

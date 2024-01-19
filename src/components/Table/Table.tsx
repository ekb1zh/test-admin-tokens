import { forwardRef } from 'react'
import clsx from 'clsx'

import Typography from 'src/components/Typography'
import Icon from 'src/components/Icon'
import Pagination from 'src/components/Table/Pagination'
import { TableProps } from 'src/components/Table/types'
import styles from 'src/components/Table/Table.module.scss'

export const Table = forwardRef<HTMLDivElement, TableProps>(
  ({ columns, rows, pagination, sorting, className }, ref) => {
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
      <div ref={ref} className={clsx(styles.Root, className)}>
        <div className={styles.HeaderRow}>
          {columns.map((column, columnIndex) => {
            const content = (
              <Typography.Text
                type='body-s-medium'
                className={styles.HeaderCellContent}
              >
                {column.label}
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

            return column.sort ? (
              <button
                key={columnIndex}
                type='button'
                className={clsx(styles.HeaderCell, styles.HeaderCellSortButton)}
                onClick={onClickSort(columnIndex)}
              >
                {content}
                {icon}
              </button>
            ) : (
              <div key={columnIndex} className={styles.HeaderCell}>
                {content}
              </div>
            )
          })}
        </div>

        <div className={styles.Main}>
          <div className={styles.Content}>
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.ContentRow}>
                {row.map((cell, cellIndex) => {
                  const { renderCell } = columns[cellIndex]
                  const content = renderCell ? renderCell(cell) : cell
                  const isClickableRow = !!columns[cellIndex].onClick
                  const className = clsx(
                    styles.ContentCell,
                    isClickableRow && styles.ContentCell_clickable,
                  )
                  const onClick = () =>
                    columns[cellIndex].onClick?.({
                      rowIndex,
                      cellIndex,
                    })

                  return (
                    <div
                      key={cellIndex}
                      className={className}
                      onClick={onClick}
                    >
                      {content}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {pagination && (
            <div className={styles.Footer}>
              <Pagination
                state={{ ...pagination.state, lengthTotal: rows.length }}
                setState={pagination.setState}
              />
            </div>
          )}
        </div>
      </div>
    )
  },
)

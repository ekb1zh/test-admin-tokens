import { forwardRef } from 'react'

import Typography from 'src/components/Typography'
import Pagination from 'src/components/Table/Pagination'
import { TableProps } from 'src/components/Table/types'
import styles from 'src/components/Table/Table.module.scss'

export const Table = forwardRef<HTMLDivElement, TableProps>(
  ({ headerRow, contentRows, paginationState }, ref) => {
    return (
      <div ref={ref} className={styles.Root}>
        <div className={styles.HeaderRow}>
          {headerRow.map((row) => (
            <div className={styles.HeaderCell}>
              <Typography.Text
                type='body-s-medium'
                className={styles.HeaderCellContent}
              >
                {row.label}
              </Typography.Text>
            </div>
          ))}
        </div>

        <div className={styles.Content}>
          {contentRows.map((row, rowIndex) => (
            <div className={styles.ContentRow}>
              {row.map((value, valueIndex) => {
                const { renderCell: renderFn } = headerRow[valueIndex]
                const content = renderFn ? renderFn(value) : value

                return (
                  <div
                    className={styles.ContentCell}
                    onClick={() =>
                      headerRow[valueIndex].onClick?.({
                        rowIndex,
                        cellIndex: valueIndex,
                      })
                    }
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {paginationState && (
          <div className={styles.Footer}>
            <Pagination />
          </div>
        )}
      </div>
    )
  },
)

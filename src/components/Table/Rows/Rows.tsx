import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'

import { useTableContext } from 'src/components/Table/context'
import styles from 'src/components/Table/Rows/Rows.module.scss'

export const Rows = forwardRef<HTMLDivElement>((_, ref) => {
  const { columns, rows, paginationManager } = useTableContext()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isShowRows, setIsShowRows] = useState(false)
  const [height, setHeight] = useState('100%')

  const rowsSlice = useMemo(() => {
    if (!paginationManager) {
      return rows
    }

    const {
      state: { currentPage, lengthOfPage },
    } = paginationManager

    const from = currentPage * lengthOfPage
    const to = from + lengthOfPage

    const slice = rows.slice(from, to)

    return slice
  }, [paginationManager, rows])

  const combineRefs = <T extends HTMLDivElement>(element: T) => {
    ;(rootRef as MutableRefObject<T>).current = element

    switch (typeof ref) {
      case 'function':
        ref(element)
        break

      case 'object':
        if (ref) {
          ref.current = element
        }
        break

      default:
        break
    }
  }

  useEffect(() => {
    const { current: root } = rootRef

    if (!root || rows.length === 0) {
      return
    }

    const { height } = window.getComputedStyle(root)

    setHeight(height)
    setIsShowRows(true)
  }, [rows.length])

  return (
    <div ref={combineRefs} className={styles.Root} style={{ height }}>
      {isShowRows &&
        rowsSlice?.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.Row}>
            {row.cells.map(({ ui }, cellIndex) => {
              const isClickableRow = !!columns[cellIndex].onClickRow
              const className = clsx(
                styles.Cell,
                isClickableRow && styles.Cell_clickable,
              )
              const onClick = () =>
                columns[cellIndex].onClickRow?.({
                  row,
                  cellIndex,
                })

              return (
                <div key={cellIndex} className={className} onClick={onClick}>
                  {ui}
                </div>
              )
            })}
          </div>
        ))}
    </div>
  )
})

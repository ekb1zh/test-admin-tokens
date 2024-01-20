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
      return null
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

    if (!root) {
      return
    }

    if (rows.length < 1) {
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
            {row.map((cell, cellIndex) => {
              const { renderRowContent } = columns[cellIndex]
              const content = renderRowContent ? renderRowContent(cell) : cell
              const isClickableRow = !!columns[cellIndex].onClickRow
              const className = clsx(
                styles.Cell,
                isClickableRow && styles.Cell_clickable,
              )
              const onClick = () =>
                columns[cellIndex].onClickRow?.({
                  rowIndex,
                  cellIndex,
                })

              return (
                <div key={cellIndex} className={className} onClick={onClick}>
                  {content}
                </div>
              )
            })}
          </div>
        ))}
    </div>
  )
})

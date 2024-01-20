import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'

import { useTableContext } from 'src/components/Table/context'
import styles from 'src/components/Table/Rows/Rows.module.scss'

export const Rows = forwardRef<HTMLDivElement>((_, ref) => {
  const { columns, rows } = useTableContext()
  const rootRef = useRef<HTMLDivElement>(null)
  const [isShowRows, setIsShowRows] = useState(false)
  const [height, setHeight] = useState('100%')

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

    const { height } = window.getComputedStyle(root)

    setHeight(height)
    setIsShowRows(true)
  }, [])

  return (
    <div ref={combineRefs} className={styles.Root} style={{ height }}>
      {isShowRows &&
        rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.Row}>
            {row.map((cell, cellIndex) => {
              const { renderCell } = columns[cellIndex]
              const content = renderCell ? renderCell(cell) : cell
              const isClickableRow = !!columns[cellIndex].onClick
              const className = clsx(
                styles.Cell,
                isClickableRow && styles.Cell_clickable,
              )
              const onClick = () =>
                columns[cellIndex].onClick?.({
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

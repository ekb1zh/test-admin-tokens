import { FC, createContext, useContext, useMemo } from 'react'
import {
  TableContextValue,
  TableProviderProps,
  PaginationState,
  PaginationManager,
} from 'src/components/Table/types'

const TableContext = createContext<TableContextValue>({
  columns: [],
  rows: [],
})

export const TableProvider: FC<TableProviderProps> = ({
  columns,
  rows,
  className,
  pagination,
  sorting,
  children,
}) => {
  const paginationManager = useMemo<PaginationManager | undefined>(() => {
    if (!pagination) {
      return undefined
    }

    const {
      state: { current, firstInRange, lengthOfRange, lengthOnPage },
      setState,
    } = pagination

    const lengthTotal = rows.length
    const first = 0
    const last = lengthTotal - 1
    const lastInRange = firstInRange + lengthOfRange - 1

    const goToIndex = (index: number) => {
      const nextState: PaginationState = {
        current,
        firstInRange,
        lengthOfRange,
        lengthOnPage,
      }

      if (index >= first && index <= last) {
        nextState.current = index
      }

      if (index > lastInRange) {
        nextState.firstInRange += index - lastInRange
      }

      if (index < firstInRange) {
        nextState.firstInRange = index
      }

      setState(nextState)
    }

    const paginationManager: PaginationManager = {
      state: {
        first,
        last,
        current,
        firstInRange,
        lastInRange,
        lengthOfRange,
        lengthOnPage,
        lengthTotal,
      },
      goToIndex,
    }

    return paginationManager
  }, [pagination, rows.length])

  const value = useMemo<TableContextValue>(() => {
    const value: TableContextValue = {
      columns,
      rows,
      className,
      pagination,
      sorting,
      paginationManager,
    }

    return value
  }, [className, columns, pagination, paginationManager, rows, sorting])

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>
}

export const useTableContext = () => useContext(TableContext)

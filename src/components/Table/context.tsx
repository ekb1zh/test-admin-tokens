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
      state: {
        currentPage: currentPageProp,
        firstPageInRange: firstPageInRangeProp,
        lengthOfRange,
        lengthOfPage,
      },
      setState,
    } = pagination

    const lengthTotalRows = rows.length
    const firstRow = 0
    const lastRow = lengthTotalRows - 1

    const lengthTotalPages = Math.ceil(lengthTotalRows / lengthOfPage)
    const firstPage = 0
    const lastPage = lengthTotalPages - 1

    const lengthOfRangeLocal =
      lengthOfRange > lengthTotalPages ? lengthTotalPages : lengthOfRange

    let lastPageInRange = firstPageInRangeProp + (lengthOfRangeLocal - 1)
    if (lastPageInRange > lastPage) {
      lastPageInRange = lastPage
    }

    let firstPageInRange = lastPageInRange - (lengthOfRangeLocal - 1)
    if (firstPageInRange < firstPage) {
      lastPageInRange = firstPage
    }

    const currentPage =
      currentPageProp < firstPageInRange
        ? firstPageInRange
        : currentPageProp > lastPageInRange
          ? lastPageInRange
          : currentPageProp

    const goToIndex = (index: number) => {
      const nextState: PaginationState = {
        currentPage,
        firstPageInRange,
        lengthOfRange,
        lengthOfPage,
      }

      if (index >= firstRow && index <= lastRow) {
        nextState.currentPage = index
      }

      if (index > lastPageInRange) {
        nextState.firstPageInRange += index - lastPageInRange
      }

      if (index < firstPageInRange) {
        nextState.firstPageInRange = index
      }

      setState(nextState)
    }

    const paginationManager: PaginationManager = {
      state: {
        firstRow,
        lastRow,
        currentPage,
        firstPageInRange,
        lastPageInRange,
        firstPage,
        lastPage,
        lengthOfRange,
        lengthOfPage,
        lengthTotalRows,
        lengthTotalPages,
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

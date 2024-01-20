import { ReactNode } from 'react'

export interface TableProps {
  columns: Column[]
  rows: any[][]
  pagination?: Pagination
  sorting?: Sorting
  className?: string
}

export interface ClickEvent {
  rowIndex: number
  cellIndex: number
}

export interface Column<T = any> {
  label: T
  renderCell?: (value: T) => ReactNode
  onClick?: (event: ClickEvent) => void
  sort?: (a: T, b: T) => number
}

export interface Pagination {
  state: PaginationState
  setState: (state: PaginationState) => void
}

export interface PaginationState {
  currentPage: number // zero-based index
  firstPageInRange: number // zero-based index
  lengthOfRange: number
  lengthOfPage: number
}

export interface Sorting {
  state: SortingState
  setState: (state: SortingState) => void
}

export interface SortingState {
  columnIndex: number
  mode: 'asc' | 'desc'
}

export interface PaginationManager {
  state: PaginationManagerState
  goToIndex: (index: number) => void
}

export interface PaginationManagerState {
  firstRow: number // zero-based index
  lastRow: number // zero-based index
  firstPage: number // zero-based index
  lastPage: number // zero-based index
  firstPageInRange: number // zero-based index
  lastPageInRange: number // zero-based index
  currentPage: number // zero-based index
  lengthOfRange: number
  lengthOfPage: number
  lengthTotalRows: number
  lengthTotalPages: number
}

export interface TableProviderProps extends TableProps {
  children: ReactNode
}

export interface TableContextValue extends TableProps {
  paginationManager?: PaginationManager
}

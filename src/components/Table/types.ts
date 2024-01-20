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
  current: number // zero-based index
  firstInRange: number // zero-based index
  lengthOfRange: number
  lengthOnPage: number
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
  first: number
  last: number
  current: number
  firstInRange: number
  lastInRange: number
  lengthOfRange: number
  lengthOnPage: number
  lengthTotal: number
}

export interface TableProviderProps extends TableProps {
  children: ReactNode
}

export interface TableContextValue extends TableProps {
  paginationManager?: PaginationManager
}

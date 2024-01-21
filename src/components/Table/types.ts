import { ReactNode } from 'react'

export interface TableProps<Data = any> {
  columns: Column<Data>[]
  rows: Row<Data>[]
  pagination?: Pagination
  sorting?: Sorting
  className?: string
}

export interface ClickEvent<Data> {
  row: Row<Data>
  cellIndex: number
}

export interface Column<Data> {
  columnLabel: string | number
  onClickRow?: (event: ClickEvent<Data>) => void
}

export interface Row<Data> {
  id: string
  data: Data
  cells: Cell[]
}

export interface Cell {
  value: any
  ui: ReactNode
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

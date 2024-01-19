import { ReactNode } from 'react'
import { PaginationState } from 'src/components/Table/Pagination'

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

export interface TablePaginationProps {
  state: PaginationState
  setState: (state: PaginationState) => void
}

export default interface TableSortingProps {
  state: SortingState
  setState: (state: SortingState) => void
}

export interface SortingState {
  columnIndex: number
  mode: 'asc' | 'desc'
}

export interface TableProps {
  columns: Column[]
  rows: any[][]
  pagination?: TablePaginationProps
  sorting?: TableSortingProps
  className?: string
}

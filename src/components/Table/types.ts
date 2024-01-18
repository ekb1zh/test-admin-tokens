import { ReactNode } from 'react'
import { PaginationState } from 'src/components/Table/Pagination'

export interface ClickEvent {
  rowIndex: number
  cellIndex: number
}

export interface HeaderCell<T extends ReactNode = ReactNode> {
  label: string | number
  renderCell?: (value: T) => ReactNode
  onClick?: (event: ClickEvent) => void
  sortFn?: (a: T, b: T) => number
}

export interface TableProps<T extends ReactNode = ReactNode> {
  headerRow: HeaderCell[]
  contentRows: T[][]
  paginationState?: PaginationState
  className?: string
}

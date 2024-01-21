import { PaginationState, SortingState } from 'src/components/Table'

export const initialPaginationState = (): PaginationState => ({
  currentPage: 0,
  firstPageInRange: 0,
  lengthOfRange: 4,
  lengthOfPage: 10,
})

export const initialSortingState = (): SortingState => ({
  mode: 'asc',
  columnIndex: 4,
})

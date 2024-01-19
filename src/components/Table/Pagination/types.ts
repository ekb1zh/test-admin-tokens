export interface PaginationState {
  current: number // zero-based index
  firstInRange: number // zero-based index
  lengthOfRange: number
  lengthOnPage: number
}

export interface PaginationStateExtended extends PaginationState {
  lengthTotal: number
}

export interface PaginationProps {
  state: PaginationStateExtended
  setState: (state: PaginationState) => void
}

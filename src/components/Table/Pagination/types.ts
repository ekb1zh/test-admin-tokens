export interface PaginationState {
  current: number // zero-based index
  firstInRange: number // zero-based index
  lengthOfRange: number
  lengthTotal: number
}

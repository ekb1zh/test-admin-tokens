import { useCallback } from 'react'
import { PaginationState } from 'src/components/Table/Pagination/types'

export const usePaginationState = (
  paginationState: PaginationState,
  setPaginationState: (paginationState: PaginationState) => void,
) => {
  const { firstInRange, lengthOfRange, lengthTotal } = paginationState

  const first = 0
  const last = lengthTotal - 1
  const lastInRange = firstInRange + lengthOfRange - 1

  const goToIndex = useCallback(
    (index: number) => {
      const newPaginationState = { ...paginationState }

      if (index >= first && index <= last) {
        newPaginationState.current = index
      }

      if (index > lastInRange) {
        newPaginationState.firstInRange += index - lastInRange
      }

      if (index < firstInRange) {
        newPaginationState.firstInRange = index
      }

      setPaginationState(newPaginationState)
    },
    [firstInRange, last, lastInRange, paginationState, setPaginationState],
  )

  return {
    state: paginationState,
    goToIndex,
  }
}

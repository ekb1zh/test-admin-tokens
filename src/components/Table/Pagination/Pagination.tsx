import { forwardRef } from 'react'

import Icon from 'src/components/Icon'
import ArrowButton from 'src/components/Table/Pagination/ArrowButton'
import NumericButton from 'src/components/Table/Pagination/NumericButton'
import Dots from 'src/components/Table/Pagination/Dots'
import { useTableContext } from 'src/components/Table/context'
import styles from 'src/components/Table/Pagination/Pagination.module.scss'

export const Pagination = forwardRef<HTMLDivElement>((_, ref) => {
  const { paginationManager } = useTableContext()

  if (!paginationManager) {
    return null
  }

  const {
    state: {
      firstPage,
      lastPage,
      currentPage,
      firstPageInRange,
      lengthOfRange,
      lengthTotalPages,
    },
    goToIndex,
  } = paginationManager

  const renderRange = () => {
    const range = Array.from({
      length: Math.min(lengthOfRange, lengthTotalPages),
    }).map((_, index) => {
      const shiftIndex = firstPageInRange + index

      return (
        <NumericButton
          key={shiftIndex}
          onClick={() => goToIndex(shiftIndex)}
          isSelected={currentPage === shiftIndex}
        >
          {shiftIndex + 1}
        </NumericButton>
      )
    })

    const hasDots = lengthTotalPages > lengthOfRange
    const isDotsLeft = currentPage > Math.floor((lengthTotalPages - 1) / 2)

    if (hasDots) {
      if (isDotsLeft) {
        range.unshift(
          <NumericButton
            key={'first-button'}
            onClick={() => goToIndex(firstPage)}
            isSelected={currentPage === firstPage}
          >
            {firstPage + 1}
          </NumericButton>,
          <Dots key={'first-dots'} />,
        )
      } else {
        range.push(
          <Dots key={'last-dots'} />,
          <NumericButton
            key={'last-button'}
            onClick={() => goToIndex(lastPage)}
            isSelected={currentPage === lastPage}
          >
            {lastPage + 1}
          </NumericButton>,
        )
      }
    }

    return range
  }

  return (
    <div ref={ref} className={styles.Root}>
      <ArrowButton
        onClick={() => goToIndex(currentPage - 1)}
        disabled={currentPage === firstPage}
      >
        <Icon.ArrowNarrowLeft />
      </ArrowButton>

      {renderRange()}

      <ArrowButton
        onClick={() => goToIndex(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <Icon.ArrowNarrowRight />
      </ArrowButton>
    </div>
  )
})

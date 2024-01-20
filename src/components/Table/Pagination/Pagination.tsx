import { Fragment, forwardRef } from 'react'

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
    state: { current, firstInRange, lengthOfRange, lengthTotal },
    goToIndex,
  } = paginationManager

  const renderRange = () => {
    const numberButtons = Array.from({
      length: Math.min(lengthTotal, lengthOfRange),
    }).map((_, index) => {
      const shiftIndex = firstInRange + index

      return (
        <NumericButton
          key={shiftIndex}
          onClick={() => goToIndex(shiftIndex)}
          isSelected={current === shiftIndex}
        >
          {shiftIndex + 1}
        </NumericButton>
      )
    })

    const isDotsLeft = current > Math.floor((lengthTotal - 1) / 2)

    if (lengthTotal > lengthOfRange) {
      return [
        isDotsLeft && (
          <Fragment key='first'>
            <NumericButton
              onClick={() => goToIndex(0)}
              isSelected={current === 0}
            >
              {1}
            </NumericButton>

            <Dots />
          </Fragment>
        ),

        ...numberButtons,

        !isDotsLeft && (
          <Fragment key='last'>
            <Dots />

            <NumericButton
              onClick={() => goToIndex(lengthTotal - 1)}
              isSelected={current === lengthTotal - 1}
            >
              {lengthTotal}
            </NumericButton>
          </Fragment>
        ),
      ]
    } else {
      return numberButtons
    }
  }

  return (
    <div ref={ref} className={styles.Root}>
      <ArrowButton
        onClick={() => goToIndex(current - 1)}
        disabled={current === 0}
      >
        <Icon.ArrowNarrowLeft />
      </ArrowButton>

      {renderRange()}

      <ArrowButton
        onClick={() => goToIndex(current + 1)}
        disabled={current === lengthTotal - 1}
      >
        <Icon.ArrowNarrowRight />
      </ArrowButton>
    </div>
  )
})

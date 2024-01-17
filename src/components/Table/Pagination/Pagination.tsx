import { forwardRef, useCallback, useMemo, useState } from 'react'
import clsx from 'clsx'
import isEqual from 'lodash/isEqual'

import Typography from 'src/components/Typography'
import Icon from 'src/components/Icon'
import { usePaginationState } from 'src/components/Table/Pagination/hooks'
import { PaginationState } from 'src/components/Table/Pagination/types'
import styles from 'src/components/Table/Pagination/Pagination.module.scss'

export const Pagination = forwardRef<HTMLDivElement>((_, ref) => {
  /*
    Temp start
  */
  const [state, setState] = useState<PaginationState>({
    current: 0,
    firstInRange: 0,
    lengthOfRange: 4,
    lengthTotal: 20,
  })

  const updateState = (next: PaginationState) =>
    setState((prev) => (isEqual(next, prev) ? prev : next))
  /*
    Temp end
  */

  const {
    state: { current, firstInRange, lengthOfRange, lengthTotal },
    goToIndex,
  } = usePaginationState(state, updateState)

  const renderNumberButton = useCallback(
    (index: number, isSelected: boolean) => (
      <button
        key={index}
        type='button'
        className={clsx(
          styles.Button,
          styles.Button_NumberButton,
          isSelected && styles.Button_NumberButton_selected,
        )}
        onClick={() => goToIndex(index)}
        disabled={isSelected}
      >
        <Typography.Text type='body-m-medium'>{index + 1}</Typography.Text>
      </button>
    ),
    [goToIndex],
  )

  const renderDots = useCallback(
    () => (
      <div className={styles.Dots}>
        <Typography.Text type='body-m-medium'>....</Typography.Text>
      </div>
    ),
    [],
  )

  const range = useMemo(() => {
    const numberButtons = Array.from({
      length: Math.min(lengthTotal, lengthOfRange),
    }).map((_, index) =>
      renderNumberButton(
        firstInRange + index,
        current === firstInRange + index,
      ),
    )

    const isDotsLeft = current > Math.floor((lengthTotal - 1) / 2)

    if (lengthTotal > lengthOfRange) {
      return [
        isDotsLeft && (
          <>
            {renderNumberButton(0, current === 0)}
            {renderDots()}
          </>
        ),

        ...numberButtons,

        !isDotsLeft && (
          <>
            {renderDots()}
            {renderNumberButton(lengthTotal - 1, current === lengthTotal - 1)}
          </>
        ),
      ]
    } else {
      return numberButtons
    }
  }, [
    current,
    firstInRange,
    lengthOfRange,
    lengthTotal,
    renderDots,
    renderNumberButton,
  ])

  return (
    <div ref={ref} className={styles.Root}>
      <button
        type='button'
        className={clsx(styles.Button, styles.Button_ArrowButton)}
        onClick={() => goToIndex(current - 1)}
        disabled={current === 0}
      >
        <Icon.ArrowNarrowLeft />
      </button>

      {range}

      <button
        type='button'
        className={clsx(styles.Button, styles.Button_ArrowButton)}
        onClick={() => goToIndex(current + 1)}
        disabled={current === lengthTotal - 1}
      >
        <Icon.ArrowNarrowRight />
      </button>
    </div>
  )
})

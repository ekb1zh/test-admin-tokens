import { forwardRef, useCallback, useMemo } from 'react'
import clsx from 'clsx'

import Typography from 'src/components/Typography'
import Icon from 'src/components/Icon'
import { PaginationProps } from 'src/components/Table/Pagination/types'
import styles from 'src/components/Table/Pagination/Pagination.module.scss'

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ state, setState }, ref) => {
    const { current, firstInRange, lengthOfRange, lengthTotal } = state

    const first = 0
    const last = lengthTotal - 1
    const lastInRange = firstInRange + lengthOfRange - 1

    const goToIndex = useCallback(
      (index: number) => {
        const nextState = { ...state }

        if (index >= first && index <= last) {
          nextState.current = index
        }

        if (index > lastInRange) {
          nextState.firstInRange += index - lastInRange
        }

        if (index < firstInRange) {
          nextState.firstInRange = index
        }

        setState(nextState)
      },
      [firstInRange, last, lastInRange, state, setState],
    )

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
  },
)

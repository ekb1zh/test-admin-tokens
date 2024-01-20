import { forwardRef } from 'react'
import clsx from 'clsx'

import Typography from 'src/components/Typography'
import Icon from 'src/components/Icon'
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

  const renderNumberButton = (index: number, isSelected: boolean) => (
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
  )

  const renderDots = () => (
    <div className={styles.Dots}>
      <Typography.Text type='body-m-medium'>....</Typography.Text>
    </div>
  )

  const renderRange = () => {
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
  }

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

      {renderRange()}

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

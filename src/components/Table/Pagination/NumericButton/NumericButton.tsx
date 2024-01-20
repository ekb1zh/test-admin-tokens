import { forwardRef } from 'react'
import clsx from 'clsx'

import Typography from 'src/components/Typography'
import { NumericButtonProps } from 'src/components/Table/Pagination/NumericButton/types'
import styles from 'src/components/Table/Pagination/NumericButton/NumericButton.module.scss'

export const NumericButton = forwardRef<HTMLButtonElement, NumericButtonProps>(
  ({ isSelected, onClick, children }, ref) => {
    return (
      <button
        ref={ref}
        type='button'
        className={clsx(styles.Root, isSelected && styles.Root_selected)}
        onClick={onClick}
        disabled={isSelected}
      >
        <Typography.Text type='body-m-medium'>{children}</Typography.Text>
      </button>
    )
  },
)

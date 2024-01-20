import { forwardRef } from 'react'

import Icon from 'src/components/Icon'
import { ActionCellProps } from 'src/pages/AppPage/ActionCell/types'
import styles from 'src/pages/AppPage/ActionCell/ActionCell.module.scss'
import clsx from 'clsx'

export const ActionCell = forwardRef<HTMLDivElement, ActionCellProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.Root, className)}>
        <button type='button' className={styles.Button}>
          <Icon.Edit />
        </button>

        <button type='button' className={styles.Button}>
          <Icon.Trash />
        </button>
      </div>
    )
  },
)

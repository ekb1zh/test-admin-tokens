import { forwardRef } from 'react'
import clsx from 'clsx'

import { typeToClassName } from 'src/components/Divider/constants'
import { DividerProps } from 'src/components/Divider/types'
import styles from 'src/components/Divider/Divider.module.scss'

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ type = 'horizontal', className }, ref) => {
    const cn = clsx(styles.Root, styles[typeToClassName[type]], className)

    return <div ref={ref} className={cn} />
  },
)

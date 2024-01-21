import { forwardRef } from 'react'
import clsx from 'clsx'

import { typeToClassName } from 'src/components/Typography/Text/constants'
import { TextProps } from 'src/components/Typography/Text/types'
import styles from 'src/components/Typography/Text/Text.module.scss'

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ type, children, className }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.Root, styles[typeToClassName[type]], className)}
      >
        {children}
      </span>
    )
  },
)

import { forwardRef } from 'react'
import clsx from 'clsx'

import {
  resolutionToClassName,
  typeToClassName,
} from 'src/components/Typography/Text/constants'
import { TextProps } from 'src/components/Typography/Text/types'
import styles from 'src/components/Typography/Text/Text.module.scss'

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ resolution, type, children }, ref) => {
    const className = clsx(
      styles.Root,
      styles[
        `Root_${resolutionToClassName[resolution]}_${typeToClassName[type]}`
      ],
    )

    return (
      <span ref={ref} className={className}>
        {children}
      </span>
    )
  },
)

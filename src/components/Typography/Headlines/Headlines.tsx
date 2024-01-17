import { forwardRef } from 'react'
import clsx from 'clsx'

import { typeToClassName } from 'src/components/Typography/Headlines/constants'
import { HeadlinesProps } from 'src/components/Typography/Headlines/types'
import styles from 'src/components/Typography/Headlines/Headlines.module.scss'

export const Headlines = forwardRef<HTMLHeadingElement, HeadlinesProps>(
  ({ type: Component, children, className }, ref) => {
    const cn = clsx(
      styles.Root,
      styles[`Root_${typeToClassName[Component]}`],
      className,
    )

    return (
      <Component ref={ref} className={cn}>
        {children}
      </Component>
    )
  },
)

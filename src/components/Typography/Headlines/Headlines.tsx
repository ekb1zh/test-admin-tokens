import { forwardRef } from 'react'
import clsx from 'clsx'

import { typeToClassName } from 'src/components/Typography/Headlines/constants'
import { HeadlinesProps } from 'src/components/Typography/Headlines/types'
import styles from 'src/components/Typography/Headlines/Headlines.module.scss'

export const Headlines = forwardRef<HTMLHeadingElement, HeadlinesProps>(
  ({ type: Component, children, className }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          styles.Root,
          styles[typeToClassName[Component]],
          className,
        )}
      >
        {children}
      </Component>
    )
  },
)

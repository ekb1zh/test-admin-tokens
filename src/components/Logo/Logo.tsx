import { forwardRef } from 'react'

import Typography from 'src/components/Typography'
import { LogoProps } from 'src/components/Logo/types'

export const Logo = forwardRef<HTMLSpanElement, LogoProps>(
  ({ className }, ref) => {
    return (
      <Typography.Text
        ref={ref}
        resolution='desktop'
        type='body-xl-semibold'
        className={className}
      >
        BitTest
      </Typography.Text>
    )
  },
)

import { forwardRef } from 'react'

import Typography from 'src/components/Typography'

export const Logo = forwardRef<HTMLSpanElement>((_, ref) => {
  return (
    <Typography.Text ref={ref} resolution='desktop' type='body-xl-semibold'>
      BitTest
    </Typography.Text>
  )
})

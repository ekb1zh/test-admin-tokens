import { ReactNode } from 'react'

export interface TextProps {
  type:
    | 'body-xxl-semibold'
    | 'body-xl-semibold'
    | 'body-m-semibold'
    | 'body-m-medium'
    | 'body-m-regular'
    | 'body-s-medium'
    | 'body-xs-regular'
  children: ReactNode
  className?: string
}

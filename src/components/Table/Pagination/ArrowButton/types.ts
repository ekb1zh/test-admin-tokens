import { ReactNode } from 'react'

export interface ArrowButtonProps
  extends Pick<React.JSX.IntrinsicElements['button'], 'onClick' | 'disabled'> {
  children: ReactNode
}

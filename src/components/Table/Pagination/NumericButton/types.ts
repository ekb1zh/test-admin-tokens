import { ReactNode } from 'react'

export interface NumericButtonProps
  extends Pick<React.JSX.IntrinsicElements['button'], 'onClick'> {
  isSelected?: boolean
  children: ReactNode
}

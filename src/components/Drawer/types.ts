import { ReactNode } from 'react'

export interface DrawerProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
  children: ReactNode
}

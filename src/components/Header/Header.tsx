import { forwardRef } from 'react'
import clsx from 'clsx'

import Card from 'src/components/Card'
import Logo from 'src/components/Logo'
import AuthUser from 'src/components/AuthUser'
import { OrganizationPanel } from 'src/components/Header/OrganizationPanel'
import { HeaderProps } from 'src/components/Header/types'
import styles from 'src/components/Header/Header.module.scss'

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ className }, ref) => {
    const cn = clsx(styles.Card, className)

    return (
      <Card ref={ref} className={cn}>
        <Logo />
        <OrganizationPanel />
        <AuthUser />
      </Card>
    )
  },
)

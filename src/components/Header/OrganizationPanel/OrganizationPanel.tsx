import { forwardRef } from 'react'
import clsx from 'clsx'

import Icon from 'src/components/Icon'
import Typography from 'src/components/Typography'
import { OrganizationPanelProps } from 'src/components/Header/OrganizationPanel/types'
import styles from 'src/components/Header/OrganizationPanel/OrganizationPanel.module.scss'

export const OrganizationPanel = forwardRef<
  HTMLDivElement,
  OrganizationPanelProps
>(({ className }, ref) => {
  const cn = clsx(styles.Root, className)

  return (
    <div ref={ref} className={cn}>
      <div className={styles.IconContainer}>
        <Icon.Organization />
      </div>

      <Typography.Text resolution='desktop' type='body-m-medium'>
        Моя организация
      </Typography.Text>
    </div>
  )
})

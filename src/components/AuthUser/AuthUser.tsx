import { forwardRef } from 'react'
import clsx from 'clsx'

import Icon from 'src/components/Icon'
import Typography from 'src/components/Typography'
import { AuthUserProps } from 'src/components/AuthUser/types'
import styles from 'src/components/AuthUser/AuthUser.module.scss'

export const AuthUser = forwardRef<HTMLDivElement, AuthUserProps>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.Root, className)}>
        <Icon.DefaultAvatar />

        <div className={styles.Container}>
          <Typography.Text type='body-xs-regular' className={styles.Text1}>
            Вы авторизованы
          </Typography.Text>

          <Typography.Text type='body-s-medium'>Администратор</Typography.Text>
        </div>
      </div>
    )
  },
)

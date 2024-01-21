import { Schema } from 'src/api'
import { DrawerProps } from 'src/components/Drawer'

export interface UserDrawerProps
  extends Pick<DrawerProps, 'isOpen' | 'onClose'> {
  user?: Schema.User
}

export type UserDrawerData = {
  user: Schema.User
  transaction: Schema.Transaction
}

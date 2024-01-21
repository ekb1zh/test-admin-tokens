import { forwardRef, useMemo } from 'react'

import Drawer from 'src/components/Drawer'
import Icon from 'src/components/Icon'
import Divider from 'src/components/Divider'
import Table, { Cell, Column, Row, TableProps } from 'src/components/Table'
import Typography from 'src/components/Typography'
import Chart from 'src/components/Chart'
import {
  UserDrawerData,
  UserDrawerProps,
} from 'src/pages/AppPage/UserDrawer/types'
import { typeToText } from 'src/pages/AppPage/UserDrawer/constants'
import { useGetUserTransactions } from 'src/api'
import {
  renderAmount,
  renderDate,
  renderText,
} from 'src/pages/AppPage/UserDrawer/helpers'
import styles from 'src/pages/AppPage/UserDrawer/UserDrawer.module.scss'

export const UserDrawer = forwardRef<HTMLDivElement, UserDrawerProps>(
  ({ isOpen, onClose, user }, ref) => {
    const { data: transactions } = useGetUserTransactions(user?.id)

    const { columns, rows } = useMemo<
      Pick<TableProps<UserDrawerData>, 'columns' | 'rows'>
    >(() => {
      if (!transactions || !user) {
        return { columns: [], rows: [] }
      }

      const columns: Column<UserDrawerData>[] = [
        { columnLabel: 'Тип' },
        { columnLabel: 'Сумма' },
        { columnLabel: 'Дата' },
      ]

      const rows: Row<UserDrawerData>[] = transactions.map((transaction) => {
        const { id, type, amount, currency, created_at } = transaction

        const data: UserDrawerData = { user, transaction }
        const cells: Cell[] = [
          {
            value: typeToText[type],
            ui: renderText(typeToText[type].value),
          },
          {
            value: [amount, currency],
            ui: renderAmount(amount, currency, typeToText[type].isPositive),
          },
          {
            value: created_at,
            ui: renderDate(created_at),
          },
        ]

        const row: Row<UserDrawerData> = {
          id,
          data,
          cells,
        }

        return row
      })

      return { columns, rows }
    }, [transactions, user])

    return (
      <Drawer ref={ref} isOpen={isOpen} onClose={onClose}>
        <div className={styles.Root}>
          <div className={styles.EmailContainer}>
            <Typography.Text type='body-xl-semibold'>
              {user?.email}
            </Typography.Text>
            <button
              className={styles.CloseButton}
              type='button'
              onClick={onClose}
            >
              <Icon.Close />
            </button>
          </div>

          <Typography.Text type='body-xl-semibold'>
            Использование токенов
          </Typography.Text>

          <Chart />

          <Divider />

          <Typography.Text type='body-xl-semibold'>
            История операций
          </Typography.Text>

          <Table columns={columns} rows={rows} />
        </div>
      </Drawer>
    )
  },
)

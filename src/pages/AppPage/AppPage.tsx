import { FC, useEffect, useState } from 'react'

import Card from 'src/components/Card'
import Divider from 'src/components/Divider'
import Header from 'src/components/Header'
import Icon from 'src/components/Icon'
import Input from 'src/components/Input'
import Table, { TableProps } from 'src/components/Table'
import Typography from 'src/components/Typography'
import Drawer from 'src/components/Drawer'
import { columns } from 'src/pages/AppPage/constants'
import {
  initialPaginationState,
  initialSortingState,
} from 'src/pages/AppPage/helpers'
import { useGetUserTransactions, useGetUsersList } from 'src/api'
import styles from 'src/pages/AppPage/AppPage.module.scss'

const rows: TableProps['rows'] = Array.from({ length: 100 }).map(() =>
  Array.from({ length: 6 }).map(() => Math.random()),
)

export const AppPage: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginationState, setPaginationState] = useState(initialPaginationState)
  const [sortingState, setSortingState] = useState(initialSortingState)
  const [filteredRows, setFilteredRows] = useState(rows)
  const [sortedRows, setSortedRows] = useState(filteredRows)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { data: users } = useGetUsersList()
  const { data: transactions } = useGetUserTransactions(
    '4da67ef6-bded-4b83-a3c2-777ece7bae3a',
  )

  console.log({ users, transactions })

  useEffect(() => {
    const nextFilteredRows = rows.filter((row) =>
      row.some((value) => String(value).includes(searchValue)),
    )

    setFilteredRows(nextFilteredRows)
  }, [searchValue])

  useEffect(() => {
    const { mode, columnIndex } = sortingState

    const nextSortedRows = [...filteredRows].sort((a, b) => {
      const v1 = a[columnIndex] as number
      const v2 = b[columnIndex] as number
      return mode === 'asc' ? v1 - v2 : v2 - v1
    })

    setSortedRows(nextSortedRows)
  }, [filteredRows, sortingState])

  useEffect(() => {
    const handler = (event: WindowEventMap['keydown']) => {
      if (event.defaultPrevented) {
        return // Do nothing if the event was already processed
      }

      if (event.key === 'Escape') {
        setIsDrawerOpen(false)
      } else {
        return
      }

      // Cancel the default action to avoid it being handled twice
      event.preventDefault()
    }

    window.addEventListener('keydown', handler, true)

    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className={styles.Root}>
      <button type='button' onClick={() => setIsDrawerOpen((prev) => !prev)}>
        click
      </button>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {'awdwad'}
      </Drawer>

      <Header />

      <Card className={styles.Card}>
        <div className={styles.Name}>
          <Typography.Text type='body-xl-semibold'>
            Моя организация
          </Typography.Text>
        </div>

        <Divider />

        <div className={styles.Content}>
          <Typography.Text type='body-xl-semibold'>
            Пользователи
          </Typography.Text>

          <Input
            placeholder='Поиск'
            value={searchValue}
            onChange={setSearchValue}
            icon={<Icon.SearchCircle />}
          />

          <Table
            columns={columns}
            rows={sortedRows}
            pagination={{
              state: paginationState,
              setState: setPaginationState,
            }}
            sorting={{
              state: sortingState,
              setState: setSortingState,
            }}
          />
        </div>
      </Card>
    </div>
  )
}

import { FC, useEffect, useState } from 'react'

import Card from 'src/components/Card'
import Divider from 'src/components/Divider'
import Header from 'src/components/Header'
import Icon from 'src/components/Icon'
import Input from 'src/components/Input'
import Table, { TableProps } from 'src/components/Table'
import Typography from 'src/components/Typography'
import { columns } from 'src/pages/AppPage/constants'
import {
  initialPaginationState,
  initialSortingState,
} from 'src/pages/AppPage/helpers'
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

  return (
    <div className={styles.Root}>
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

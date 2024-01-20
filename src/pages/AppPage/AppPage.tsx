import { FC, useEffect, useState } from 'react'

import Card from 'src/components/Card'
import Divider from 'src/components/Divider'
import Header from 'src/components/Header'
import Icon from 'src/components/Icon'
import Input from 'src/components/Input'
import Table, { SortingState, TableProps } from 'src/components/Table'
import { PaginationState } from 'src/components/Table'
import Typography from 'src/components/Typography'
import styles from 'src/pages/AppPage/AppPage.module.scss'

const renderCell: NonNullable<TableProps['columns'][number]['renderCell']> = (
  content,
) => <Typography.Text type='body-s-medium'>{String(content)}</Typography.Text>

const onClick: NonNullable<TableProps['columns'][number]['onClick']> = (
  event,
) => console.log(event)

const sort: NonNullable<TableProps['columns'][number]['sort']> = (a, b) => a - b

const columns: TableProps['columns'] = [
  {
    label: 'Header 1',
    renderCell,
    onClick,
    sort,
  },
  {
    label: 'Header 2',
    renderCell,
    onClick,
    sort,
  },
  {
    label: 'Header 3',
    renderCell,
    onClick,
  },
  {
    label: 'Header 4',
    renderCell,
    onClick,
  },
  {
    label: 'Header 5',
    renderCell,
    onClick,
  },
]

const rows: TableProps['rows'] = Array.from({ length: 100 }).map(() =>
  Array.from({ length: 5 }).map(() => Math.random()),
)

const initialPaginationState = (): PaginationState => ({
  currentPage: 0,
  firstPageInRange: 0,
  lengthOfRange: 4,
  lengthOfPage: 10,
})

const initialSortingState = (): SortingState => ({
  mode: 'asc',
  columnIndex: 0,
})

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

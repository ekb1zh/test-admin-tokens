import { FC, useEffect, useMemo, useState } from 'react'

import Card from 'src/components/Card'
import Divider from 'src/components/Divider'
import Header from 'src/components/Header'
import Icon from 'src/components/Icon'
import Input from 'src/components/Input'
import Table, { Cell, Column, Row, TableProps } from 'src/components/Table'
import Typography from 'src/components/Typography'
import UserDrawer from 'src/pages/AppPage/UserDrawer'
import ActionCell from 'src/pages/AppPage/ActionCell'

import {
  initialPaginationState,
  initialSortingState,
} from 'src/pages/AppPage/helpers'
import { useGetUsersList, Schema } from 'src/api'
import styles from 'src/pages/AppPage/AppPage.module.scss'

export const AppPage: FC = () => {
  const { data: users } = useGetUsersList()
  const [selectedUser, setSelectedUser] = useState<Schema.User>()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [searchValue, setSearchValue] = useState('')
  const [sortingState, setSortingState] = useState(initialSortingState)
  const [paginationState, setPaginationState] = useState(initialPaginationState)

  const { columns, rows } = useMemo<
    Pick<TableProps<Schema.User>, 'columns' | 'rows'>
  >(() => {
    if (!users) {
      return { columns: [], rows: [] }
    }

    const rows: Row<Schema.User>[] = users.data.map((user) => {
      const {
        email,
        name,
        role,
        subscription: {
          plan: { type },
          tokens,
        },
      } = user

      const cells: Cell[] = [email, name, role, type, tokens].map((value) => ({
        value,
        ui: <Typography.Text type='body-s-medium'>{value}</Typography.Text>,
      }))

      cells.push({ value: null, ui: <ActionCell /> })

      const row: Row<Schema.User> = {
        id: user.id,
        data: user,
        cells,
      }

      return row
    })

    const onClickRow: Column<Schema.User>['onClickRow'] = ({
      row: { data: user },
    }) => {
      setSelectedUser(user)
      setIsDrawerOpen(true)
    }

    const columns: Column<Schema.User>[] = [
      'Email',
      'Имя',
      'Роль',
      'Подписка',
      'Токены',
      'Действия',
    ].map((columnLabel) => ({ columnLabel, onClickRow }))

    return { columns, rows }
  }, [users])

  const [filteredRows, setFilteredRows] = useState(rows)
  const [sortedRows, setSortedRows] = useState(filteredRows)

  useEffect(() => {
    const searchValueLowerCase = searchValue.toLowerCase()

    const nextFilteredRows = rows.filter((row) =>
      row.cells.some(({ value }) =>
        value
          ? String(value).toLowerCase().includes(searchValueLowerCase)
          : false,
      ),
    )

    setFilteredRows(nextFilteredRows)
  }, [rows, searchValue])

  useEffect(() => {
    const { mode, columnIndex } = sortingState

    const nextSortedRows = [...filteredRows].sort((row1, row2) => {
      const v1 = row1.cells[columnIndex].value as number
      const v2 = row2.cells[columnIndex].value as number
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
      <UserDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={selectedUser}
      />

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

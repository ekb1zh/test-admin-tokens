import { TableProps } from 'src/components/Table'
import {
  onClick,
  renderActionCell,
  renderCell,
  sort,
} from 'src/pages/AppPage/helpers'

export const columns: TableProps['columns'] = [
  {
    label: 'Email',
    renderCell,
    onClick,
  },
  {
    label: 'Имя',
    renderCell,
    onClick,
  },
  {
    label: 'Роль',
    renderCell,
    onClick,
  },
  {
    label: 'Подписка',
    renderCell,
    onClick,
  },
  {
    label: 'Токены',
    renderCell,
    onClick,
    sort,
  },
  {
    label: 'Действия',
    renderCell: renderActionCell,
    onClick,
  },
]

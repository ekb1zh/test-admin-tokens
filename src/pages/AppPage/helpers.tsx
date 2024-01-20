import Typography from 'src/components/Typography'
import { PaginationState, SortingState, TableProps } from 'src/components/Table'
import ActionCell from 'src/pages/AppPage/ActionCell'

export const initialPaginationState = (): PaginationState => ({
  currentPage: 0,
  firstPageInRange: 0,
  lengthOfRange: 4,
  lengthOfPage: 10,
})

export const initialSortingState = (): SortingState => ({
  mode: 'asc',
  columnIndex: 4,
})

export const renderCell: NonNullable<
  TableProps['columns'][number]['renderCell']
> = (content) => (
  <Typography.Text type='body-s-medium'>{String(content)}</Typography.Text>
)

export const renderActionCell: NonNullable<
  TableProps['columns'][number]['renderCell']
> = () => <ActionCell />

export const onClick: NonNullable<TableProps['columns'][number]['onClick']> = (
  event,
) => console.log(event)

export const sort: NonNullable<TableProps['columns'][number]['sort']> = (
  a,
  b,
) => a - b

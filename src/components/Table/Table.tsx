import { forwardRef } from 'react'

import { TableProvider } from 'src/components/Table/context'
import { Container } from 'src/components/Table/Container/Container'
import { TableProps } from 'src/components/Table/types'

export const Table = forwardRef<HTMLDivElement, TableProps>((props, ref) => {
  return (
    <TableProvider {...props}>
      <Container ref={ref} />
    </TableProvider>
  )
})

import { ReactNode } from 'react'
import { format } from 'date-fns'

import Typography from 'src/components/Typography'
import styles from 'src/pages/AppPage/UserDrawer/UserDrawer.module.scss'

export const renderText = (text: string) => {
  return <Typography.Text type='body-s-medium'>{text}</Typography.Text>
}

export const renderAmount = (
  amount: number,
  currency: string,
  isPositive: boolean,
) => {
  const amountString = String(Math.floor(amount))

  let result = ''
  for (
    let index = amountString.length - 1, count = 0;
    index >= 0;
    --index, ++count
  ) {
    if (count > 2) {
      result = ' ' + result
      count = 0
    }

    const char = amountString[index]
    result = char + result
  }
  result = (isPositive ? '+' : '-') + result
  result = result + ' ' + currency.toUpperCase()

  const className = isPositive ? styles.AmountPositive : styles.AmountNegative

  return (
    <Typography.Text type='body-s-medium' className={className}>
      {result}
    </Typography.Text>
  )
}

export const renderDate = (isoDate: string): ReactNode => {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) {
    console.error(`Incorrect date: ${isoDate}`)
    return null
  }

  const part1 = format(date, 'dd.MM.yy')
  const part2 = format(date, 'kk:mm:ss')

  return (
    <Typography.Text type='body-s-medium'>
      {part1},
      <br />
      {part2}
    </Typography.Text>
  )
}

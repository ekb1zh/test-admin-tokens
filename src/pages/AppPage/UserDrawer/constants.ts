import { Schema } from 'src/api'

export const typeToText: Record<
  Schema.Transaction['type'],
  { value: string; isPositive: boolean }
> = {
  SUBSCRIPTION: { value: 'Подписка', isPositive: true },
  REPLENISH: { value: 'Пополнение', isPositive: true },
  WITHDRAW: { value: 'Списание', isPositive: false },
  WRITE_OFF: { value: 'Отзыв', isPositive: false },
}

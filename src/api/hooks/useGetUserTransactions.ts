import { useQuery } from '@tanstack/react-query'
import { getUserTransactions } from 'src/api/requests/getUserTransactions'
import { FetchError } from 'src/api/utils'
import * as Schema from 'src/api/schema'

export const useGetUserTransactions = (userId: Schema.User['id']) =>
  useQuery<
    Schema.Api.GetUserTransactions.Response.Data,
    FetchError<Schema.Api.GetUserTransactions.Response.Error>
  >({
    queryKey: ['getUserTransactions', userId],
    queryFn: () => getUserTransactions(userId),
  })

import { useQuery } from '@tanstack/react-query'
import { getUserTransactions } from 'src/api/requests/getUserTransactions'
import { RequestError } from 'src/api/utils'
import * as Schema from 'src/api/schema'

export const useGetUserTransactions = (userId?: Schema.User['id']) =>
  useQuery<
    Schema.Api.GetUserTransactions.Response.Data,
    RequestError<Schema.Api.GetUserTransactions.Response.Error>
  >({
    queryKey: ['getUserTransactions', userId],
    queryFn: userId ? () => getUserTransactions(userId) : undefined,
    enabled: !!userId, // https://tanstack.com/query/v4/docs/react/guides/dependent-queries
  })

import { useQuery } from '@tanstack/react-query'
import { getUsersList } from 'src/api/requests/getUsersList'
import { FetchError } from 'src/api/utils'
import * as Schema from 'src/api/schema'

export const useGetUsersList = () =>
  useQuery<
    Schema.Api.GetUsersList.Response.Data,
    FetchError<Schema.Api.GetUsersList.Response.Error>
  >({
    queryKey: ['getUsersList'],
    queryFn: getUsersList,
  })

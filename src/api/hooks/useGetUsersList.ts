import { useQuery } from '@tanstack/react-query'
import { getUsersList } from 'src/api/requests/getUsersList'
import { RequestError } from 'src/api/utils'
import * as Schema from 'src/api/schema'

export const useGetUsersList = () =>
  useQuery<
    Schema.Api.GetUsersList.Response.Data,
    RequestError<Schema.Api.GetUsersList.Response.Error>
  >({
    queryKey: ['getUsersList'],
    queryFn: getUsersList,
  })

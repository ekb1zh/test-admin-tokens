import axios from 'axios'
import * as Schema from 'src/api/schema'
import { host } from 'src/api/constants'
import { FetchError } from 'src/api/utils'

export const getUserTransactions = async (
  userId: Schema.User['id'],
): Promise<Schema.Api.GetUserTransactions.Response.Data> => {
  const request: Schema.Api.GetUserTransactions.Request = {
    url: `${host}/user/${userId}/transactions`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: null,
  }

  const { data, status } = await axios.request<
    Schema.Api.GetUserTransactions.Response.Data,
    Schema.Api.GetUserTransactions.Response.Success
  >(request)

  if (status === 200) {
    return data
  } else {
    throw new FetchError(data)
  }
}

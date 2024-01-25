import axios from 'axios'
import * as Schema from 'src/api/schema'
import { host } from 'src/api/constants'
import { RequestError } from 'src/api/utils'

export const getUsersList =
  async (): Promise<Schema.Api.GetUsersList.Response.Data> => {
    const request: Schema.Api.GetUsersList.Request = {
      url: `${host}/user/list`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      data: null,
    }

    const { data, status } = await axios.request<
      Schema.Api.GetUsersList.Response.Data,
      Schema.Api.GetUsersList.Response.Success
    >(request)

    if (status === 200) {
      return data
    } else {
      throw new RequestError(data)
    }
  }

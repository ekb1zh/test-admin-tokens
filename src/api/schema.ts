import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface User {
  id: string
  email: string | null
  tg_id: string | null
  name: string
  password: string | null
  avatar: string | null
  created_at: string
  role: 'ADMIN' | 'USER'
  subscription: UserSubscription
}

export interface UserSubscription {
  id: string
  plan_id: string
  user_id: string
  tokens: number
  additional_tokens: number
  created_at: string
  plan: UserSubscriptionPlan
}

export interface UserSubscriptionPlan {
  id: string
  type: 'BASIC' | 'ELITE' | 'PREMIUM' | string
  price: number
  currency: 'RUB' | 'USD' | string
  tokens: number
}

export interface Users {
  data: User[]
  pages: number
}

export type Transactions = Transaction[]

export interface Transaction {
  id: string
  provider: 'YOOMONEY' | 'CRYPTO' | 'SYSTEM'
  currency: 'RUB' | 'USD' | 'EUR' | 'SYSTEM_TOKEN'
  meta: {} | null
  amount: number
  status: 'FAILED' | 'SUCCEDED' | 'PENDING'
  type: 'SUBSCRIPTION' | 'WRITE_OFF' | 'REPLENISH' | 'WITHDRAW'
  plan_id: string | null
  user_id: string | null
  referral_id: string | null
  external_id: string | null
  created_at: string
}

export namespace Api {
  export type Host = 'https://test.gefara.xyz/api/v1'

  export namespace GetUsersList {
    export interface Request extends AxiosRequestConfig {
      url: `${Host}/user/list`
      method: 'GET'
      headers: {
        'Content-Type': 'application/json'
      }
      data: null
    }

    export namespace Response {
      export type Data = Users

      export interface Success extends AxiosResponse<Data> {
        status: 200
      }

      export type Error = unknown
    }
  }

  export namespace GetUserTransactions {
    export interface Request extends AxiosRequestConfig {
      url: `${Host}/user/${User['id']}/transactions`
      method: 'GET'
      headers: {
        'Content-Type': 'application/json'
      }
      data: null
    }

    export namespace Response {
      export type Data = Transactions

      export interface Success extends AxiosResponse<Data> {
        status: 200
      }

      export type Error = unknown
    }
  }
}

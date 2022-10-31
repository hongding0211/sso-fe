export type IResponse<T extends Record<string, any> | Record<string, any>[]> = {
  success: boolean
  msg?: string
  data?: T
}

export interface IApi {
  IReq: Record<string, any>
  IRes: IResponse<Record<string, any> | Record<string, any>[]>
}

export interface IPostApiLogin extends IApi {
  IReq: {
    email?: string
    phone?: string
    password: string
  }
  IRes: IResponse<{
    ticket: string
  }>
}

export interface IPostApiRegister extends IApi {
  IReq: {
    email?: string
    phone?: string
    name: string
    password: string
    avatar: string
  }
  IRes: IResponse<{
    email?: string
    phone?: string
    name: string
    avatar: string
  }>
}

export interface IPostApiValidate extends IApi {
  IReq: {
    ticket: string
    maxAge?: string | number
  }
  IRes: IResponse<{}>
}

export interface IGetApiUserInfo extends IApi {
  IReq: {}
  IRes: IResponse<{
    email?: string
    phone?: string
    name: string
    avatar: string
  }>
}



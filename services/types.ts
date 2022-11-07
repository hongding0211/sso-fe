export type IResponseBody<T extends Record<string, any> | Record<string, any>[]> = {
  success: boolean
  msg?: string
  data?: T
}

export interface IApi {
  IReq: Record<string, any>
  IRes: IResponseBody<Record<string, any> | Record<string, any>[]>
}

export interface IPostApiLogin extends IApi {
  IReq: {
    email?: string
    phone?: string
    password: string
  }
  IRes: IResponseBody<{
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
  IRes: IResponseBody<{
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
  IRes: IResponseBody<{
    authToken: string
  }>
}

export interface IGetApiUserInfo extends IApi {
  IReq: {
    authToken: string
  }
  IRes: IResponseBody<{
    email?: string
    phone?: string
    name: string
    avatar: string
  }>
}

export interface IPostUpload extends IApi {
  IReq: {
    file: File
  }
  IRes: {
    url: string
  }
}

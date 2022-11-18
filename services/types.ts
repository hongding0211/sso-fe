export type IResponseBody<
  T extends Record<string, any> | Record<string, any>[]
  > = {
  success: boolean
  msg?: string
  data?: T
}

export type IRequest<
  P extends Record<string, any> | undefined,
  T extends Record<string, any> | undefined
  > = {
  params?: P
  body?: T
}

export interface IApi {
  IReq: IRequest<
    Record<string, any> | undefined,
    Record<string, any> | undefined
    >
  IRes: IResponseBody<Record<string, any> | Record<string, any>[]>
}

export interface IPostApiLogin extends IApi {
  IReq: IRequest<
    undefined,
    {
      email?: string
      phone?: string
      password: string
    }
    >
  IRes: IResponseBody<{
    ticket: string
  }>
}

export interface IPostApiRegister extends IApi {
  IReq: IRequest<
    undefined,
    {
      email?: string
      phone?: string
      name: string
      password: string
      avatar: string
    }
    >
  IRes: IResponseBody<{
    email?: string
    phone?: string
    name: string
    avatar: string
  }>
}

export interface IPostApiValidate extends IApi {
  IReq: IRequest<
    undefined,
    {
      ticket: string
      maxAge?: string | number
    }
    >
  IRes: IResponseBody<{
    authToken: string
  }>
}

export interface IGetApiUserInfo extends IApi {
  IReq: IRequest<
    {
      authToken: string
    },
    undefined
    >
  IRes: IResponseBody<{
    email?: string
    phone?: string
    name: string
    avatar: string
  }>
}

export interface IPostApiSendCode extends IApi {
  IReq: IRequest<
    {
      authToken: string
    },
    undefined
    >
  IRes: IResponseBody<{}>
}

export interface IPatchApiUserInfo extends IApi {
  IReq: IRequest<
    {
      authToken?: string
    },
    {
      email?: string
      phone?: string
      name?: string
      avatar?: string
    }
    >
  IRes: IResponseBody<{
    email?: string
    phone?: string
    name: string
    avatar: string
  }>
}

export interface IPostApiModifyPassword extends IApi {
  IReq: IRequest<
    {
      authToken: string
    },
    {
      code: string
      newPassword: string
    }
    >
  IRes: IResponseBody<{}>
}

export interface IPostApiForgetPassword extends IApi {
  IReq: IRequest<
    undefined,
    {
      email?: string
      phone?: string
    }
    >
  IRes: IResponseBody<{}>
}

export interface IPostApiResetPassword extends IApi {
  IReq: IRequest<
    undefined,
    {
      email?: string
      phone?: string
      code: string
      newPassword: string
    }
    >
  IRes: IResponseBody<{}>
}

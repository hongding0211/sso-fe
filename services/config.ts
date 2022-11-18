// export const BASE_URL = 'https://hong97.ltd/sso'
export const BASE_URL = 'http://127.0.0.1:3000'

export const APIS = {
  POST_LOGIN: `${BASE_URL}/api/login`,
  POST_VALIDATE: `${BASE_URL}/api/validate`,
  POST_REGISTER: `${BASE_URL}/api/register`,
  GET_USR_INFO: `${BASE_URL}/api/userinfo`,
  POST_MODIFY_PASSWORD: `${BASE_URL}/api/modifyPassword`,
  POST_SEND_CODE: `${BASE_URL}/api/sendCode`,
  POST_FORGET_PASSWORD: `${BASE_URL}/api/forgetPassword`,
  POST_RESET_PASSWORD: `${BASE_URL}/api/resetPassword`,
  POST_UPLOAD: `https://hong97.ltd/upload/`
}

export const UPLOAD_SECRET = 'linmeihuashiyigemeimao'

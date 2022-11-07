import React, {createRef, KeyboardEvent, useEffect, useState} from "react";
import Requester from "../../services/requester";
import {IPostApiLogin, IPostApiRegister} from "../../services/types";
import {APIS} from "../../services/config";
import toast from "react-hot-toast";
import {Button, Input, Loading} from "@nextui-org/react";
import shajs from "sha.js";

type ILogin = {
  onRegister: () => void
  onLoggedIn: (ticket: string) => void
  registeredData?: IPostApiRegister['IRes']['data']
}

const Login: React.FunctionComponent<ILogin> = props =>  {
  const [emailInput, setEmailInput] = useState(props.registeredData?.email || props.registeredData?.phone || '' )
  const [passwordInput, setPasswordInput] = useState('')
  const [pending, setPending] = useState(false)

  const emailInputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])



  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.code === 'Enter') {
      handleClickLogin()
    }
  }

  function handleClickLogin() {
    const phone = /^\d{11}$/.test(emailInput) ? emailInput : undefined
    const email = /^\S+@\S+.\w$/.test(emailInput) ? emailInput : undefined
    if (!phone && !email) {
      toast.error('邮箱 / 电话格式错误')
      return
    }
    if (!passwordInput) {
      toast.error('密码为空')
      return
    }
    const hashedPassword = shajs('sha256').update(passwordInput).digest('hex')
    const req = new Requester<IPostApiLogin>(APIS.POST_LOGIN)
    setPending(true)
    req.post({
      email,
      phone,
      password: shajs('sha256')
        .update(`${Math.floor(Date.now() / 60000) - 1}${hashedPassword}`)
        .digest('hex'),
    }).then(res => {
      if (!res.success || !res?.data ) {
        toast.error(res?.msg || '登录失败')
        return
      }
      props.onLoggedIn(res.data.ticket)
    }).catch(e => {
      toast.error(`登录失败 ${e}`)
    }).finally(() => {
      setPending(false)
    })
  }

  function handleClickRegister() {
    props.onRegister()
  }

  function handleClickForget() {
    toast.error('开发中...')
  }
4
  return (
    <>
      <p className='font-medium md:text-4xl text-zinc-900 hidden md:block dark:text-zinc-200'>登录</p>
      <div onKeyDown={handleKeyDown} className='mb-8 mb:my-none'>
        <Input label='邮箱 / 电话' value={emailInput} onChange={e => setEmailInput(e.target.value)} ref={emailInputRef} clearable fullWidth/>
        <div className='mt-6'>
          <Input label='密码' value={passwordInput} type='password' onChange={e => setPasswordInput(e.target.value)} clearable fullWidth/>
          <p className='text-sm text-zinc-600 underline cursor-pointer mt-3 dark:text-zinc-400' onClick={handleClickForget}>忘记密码</p>
        </div>
      </div>
      <div className='flex flex-col w-full gap-y-4'>
        <Button onClick={handleClickLogin} color='primary' shadow disabled={pending}>
          {
            pending ? <Loading type="points" color="currentColor" size="sm" /> : <span>登录</span>
          }
        </Button>
        <Button onClick={handleClickRegister} bordered disabled={pending}>注册</Button>
      </div>
    </>
  )
}

export default Login

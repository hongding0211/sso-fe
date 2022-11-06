import React, {createRef, KeyboardEvent, useEffect, useRef, useState} from "react";
import Requester from "../../services/requester";
import {IPostApiLogin} from "../../services/types";
import {APIS} from "../../services/config";
import toast from "react-hot-toast";
import {Button, Input} from "@nextui-org/react";

type ILogin = {
  onRegister: () => void
  onLoggedIn: () => void
}

const Login: React.FunctionComponent<ILogin> = props =>  {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const clientURL = useRef('')

  const emailInputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const found = /\?client=(\S+)/g.exec(decodeURIComponent(document.location.search))
    if (found !== null) {
      clientURL.current = found[1]
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
    const req = new Requester<IPostApiLogin>(APIS.POST_LOGIN)
    req.post({
      email,
      phone,
      password: passwordInput,
    }).then(res => {
      if (!res.success || !res?.data ) {
        toast.error(`登录失败 ${res.msg}`)
        return
      }
      if (clientURL.current === '') {
        toast.success('登录成功')
        return
      }
      window.location.href = `${clientURL.current}?${encodeURIComponent(`ticket=${res.data.ticket}`)}`
    }).catch(e => {
      toast.error(`登录失败 ${e}`)
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
        <Button onClick={handleClickLogin} color='primary'>登录</Button>
        <Button onClick={handleClickRegister} bordered>注册</Button>
      </div>
    </>
  )
}

export default Login

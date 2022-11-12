import React, {createRef, KeyboardEvent, useEffect, useState} from "react";
import Requester from "../../services/requester";
import {IPostApiLogin, IPostApiRegister} from "../../services/types";
import {APIS} from "../../services/config";
import toast from "react-hot-toast";
import {Button, Input, Loading, useInput} from "@nextui-org/react";
import shajs from "sha.js";

type ILogin = {
  onRegister: () => void
  onLoggedIn: (ticket: string) => void
  registeredData?: IPostApiRegister['IRes']['data']
}

const Login: React.FunctionComponent<ILogin> = props =>  {
  const [passwordInput, setPasswordInput] = useState('')
  const [pending, setPending] = useState(false)

  const { value: emailInput, bindings } = useInput(props.registeredData?.email || props.registeredData?.phone || '')

  const helper: {
    color: "success" | "error" | "default" | "primary" | "secondary" | "warning" | undefined
  } = React.useMemo(() => {
    if (!emailInput)
      return {
        color: undefined,
      };
    const isValid = validateEmailPhone(emailInput);
    return {
      color: isValid ? "default" : "error",
    };
  }, [emailInput])

  const emailInputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  function validateEmailPhone(value: string) {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) || value.match(/^\d{11}$/)
  }

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
      body: {
        email,
        phone,
        password: shajs('sha256')
          .update(`${Math.floor(Date.now() / 60000) - 1}${hashedPassword}`)
          .digest('hex'),
      }
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

  return (
    <>
      <p className='font-medium md:text-4xl text-zinc-900 hidden md:block dark:text-zinc-200'>登录</p>
      <div onKeyDown={handleKeyDown} className='mb-8 mb:my-none'>
        <div className='flex flex-col gap-y-4'>
          <Input
            {...bindings}
            label='邮箱 / 电话'
            ref={emailInputRef}
            fullWidth
            status={helper.color}
            color={helper.color}
          />
          <Input
            label='密码'
            value={passwordInput}
            type='password'
            onChange={e => setPasswordInput(e.target.value)}
            fullWidth
          />
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

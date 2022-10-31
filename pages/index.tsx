import Button from "../components/button";
import Input from "../components/input";
import {useState, KeyboardEvent, useRef, useEffect, createRef} from "react";
import { APIS } from '../services/config'
import Requester from "../services/requester";
import {IPostApiLogin} from "../services/types";
import toast, {Toaster} from "react-hot-toast";

export default function Home() {
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
    const req = new Requester<IPostApiLogin>(APIS.POST_LOGIN)
    req.post({
      email,
      phone,
      password: passwordInput,
    }).then(res => {
      if (clientURL.current === '') {
        toast.error('开发中...')
        return
      }
      if (!res.success || !res?.data ) {
        toast.error('无效 Ticket')
        return
      }
      window.location.href = `${clientURL.current}?${encodeURIComponent(`ticket=${res.data.ticket}`)}`
    }).catch(e => {
      toast.error(`登录失败 ${e}`)
    })
  }

  function handleClickRegister() {
    toast.error('开发中...')
  }

  function handleClickForget() {
    toast.error('开发中...')
  }

  function handleChangeEmailInput(value: string) {
    setEmailInput(value)
  }

  function handleChangePassword(value: string) {
    setPasswordInput(value)
  }

  return (
    <>
      <div className='h-screen w-screen bg-bg_light dark:bg-bg_dark bg-cover flex justify-center items-center'>
        <div className='relative top-[-5vh] md:static md:top-none shadow-xl p-8 md:p-12 bg-white dark:bg-black m-6 w-full max-w-[450px] md:max-w-none rounded-xl flex flex-col justify-between md:flex-row md:items-center md:w-[893px] md:h-[552px] md:rounded-2xl'>
          <div className='h-[100px] md:h-full bg-contain bg-no-repeat relative bg-illustrator_s bg-[right_-40px_top] md:w-[360px] md:bg-illustrator_l md:bg-bottom'>
            <div>
              <p className='text-blue-500 font-medium text-3xl md:text-4xl'>Single Sign On</p>
              <p className='text-zinc-900 mt-2 font-medium dark:text-zinc-200'>统一登录验证平台</p>
            </div>
          </div>
          <div className='flex flex-col h-min justify-between md:w-[50%] md:h-full'>
            <p className='font-medium md:text-4xl text-zinc-900 hidden md:block dark:text-zinc-200'>登录</p>
            <div onKeyDown={handleKeyDown} className='mb-8 mb:my-none'>
              <Input label='邮箱 / 电话' value={emailInput} onChange={handleChangeEmailInput} ref={emailInputRef}/>
              <div className='mt-2'>
                <Input label='密码' value={passwordInput} type='password' onChange={handleChangePassword}/>
                <p className='text-sm text-zinc-600 underline cursor-pointer mt-3 dark:text-zinc-400' onClick={handleClickForget}>忘记密码</p>
              </div>
            </div>
            <div className='flex flex-col w-full gap-y-4'>
              <Button onClick={handleClickLogin} type='primary'>登录</Button>
              <Button onClick={handleClickRegister}>注册</Button>
            </div>
          </div>
        </div>
        <footer className='absolute bottom-4 md:bottom-6'>
          <span className='text-sm text-zinc-600 dark:text-zinc-400'>Copyright © {`${new Date(Date.now()).getFullYear()}`} SSO <a className='underline' target='_blank' href='https://hong97.ltd' rel="noreferrer">hong97.ltd</a></span>
        </footer>
      </div>
      <Toaster />
    </>
  )
}

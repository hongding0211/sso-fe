import Button from "../components/button";
import Input from "../components/input";
import {useState, KeyboardEvent} from "react";

export default function Home() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.code === 'Enter') {
      handleClickLogin()
    }
  }

  function handleClickLogin() {
    // TODO
  }

  function handleClickRegister() {
    // TODO
  }

  function handleClickForget() {
    // TODO
  }

  function handleChangeEmailInput(value: string) {
    setEmailInput(value)
  }

  function handleChangePassword(value: string) {
    setPasswordInput(value)
  }

  return (
    <div className='h-screen w-screen bg-bg_light dark:bg-bg_dark bg-cover flex justify-center items-center min-w-max'>
      <div className='shadow-xl p-8 md:p-12 bg-white dark:bg-black m-6 w-full max-w-[450px] md:max-w-none rounded-xl flex flex-col justify-between md:flex-row md:items-center md:w-[893px] md:h-[552px] md:rounded-2xl'>
        <div className='h-[120px] md:h-full bg-contain bg-no-repeat relative bg-illustrator_s bg-[right_-40px_top] md:w-[360px] md:bg-illustrator_l md:bg-bottom'>
          <div>
            <p className='text-blue-500 font-medium text-3xl md:text-4xl'>Single Sign On</p>
            <p className='text-zinc-900 mt-2 font-medium dark:text-zinc-200'>统一登录验证平台</p>
          </div>
        </div>
        <div className='flex flex-col h-min justify-between md:w-[50%] md:h-full'>
          <p className='font-medium md:text-4xl text-zinc-900 hidden md:block dark:text-zinc-200'>登录</p>
          <div onKeyDown={handleKeyDown} className='mb-8 mb:my-none'>
            <Input label='邮箱 / 电话' value={emailInput} onChange={handleChangeEmailInput}/>
            <div className='mt-8'>
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
    </div>
  )
}

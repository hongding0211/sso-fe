import Head from "next/head";
import Login from '../components/home/login'
import Register from "../components/register/register";
import {Text} from "@nextui-org/react";
import {createElement, FunctionComponentElement, useState} from "react";

export default function Home() {
  const loginComponent = createElement(Login, {
    onRegister: handleRegister,
    onLoggedIn: handleLoggedIn,
  })
  const registerComponent = createElement(Register, {
    onBack: handleRegisterBack,
    onRegistered: handleRegistered
  })

  const [currentComponent, setCurrentComponent] = useState<FunctionComponentElement<any>>(loginComponent)

  function handleRegister() {
    setCurrentComponent(registerComponent)
  }

  function handleLoggedIn() {
    // TODO
  }

  function handleRegisterBack() {
    setCurrentComponent(loginComponent)
  }

  function handleRegistered() {
    // TODO
  }

  return (
    <>
      <Head>
        <title>SSO 统一登录</title>
      </Head>
      <div className='h-screen w-screen bg-bg_light dark:bg-bg_dark bg-cover flex justify-center items-center'>
        <div className='relative top-[-5vh] md:static md:top-none shadow-xl p-8 md:p-12 bg-white dark:bg-black m-6 w-full max-w-[450px] md:max-w-none rounded-xl flex flex-col justify-between md:flex-row md:items-center md:w-[893px] md:h-[552px] md:rounded-2xl'>
          <div className='h-[100px] md:h-full bg-contain bg-no-repeat relative bg-illustrator_s bg-[right_-40px_top] md:w-[360px] md:bg-illustrator_l md:bg-bottom'>
            <div>
              <Text
                h1
                css={{
                  textGradient: "45deg, $blue600 -20%, $cyan600 50%",
                }}
                className='text-2xl md:text-4xl'
                weight="bold"
              >Single Sign On</Text>
              <p className='text-zinc-900 mt-2 font-medium dark:text-zinc-200'>统一登录验证平台</p>
            </div>
          </div>
          <div className='flex flex-col h-min justify-between md:w-[50%] md:h-full'>
            { currentComponent }
          </div>
        </div>
        <footer className='absolute bottom-4 md:bottom-6'>
          <span className='text-sm text-zinc-600 dark:text-zinc-400'>Copyright © {`${new Date(Date.now()).getFullYear()}`} SSO <a className='underline' target='_blank' href='https://hong97.ltd' rel="noreferrer">hong97.ltd</a></span>
        </footer>
      </div>
    </>
  )
}

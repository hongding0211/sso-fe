import Head from "next/head";
import Login from '../components/home/login'
import Register from "../components/register/register";
import {Modal, Text} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import {IPostApiRegister} from "../services/types";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from '../public/logo.png'

export default function Home() {
  const [showRegister, setShowRegister] = useState(false)
  const [registeredData, setRegisteredData] = useState<IPostApiRegister['IRes']['data'] | undefined>(undefined)
  const [showAboutModal, setShowAboutModal] = useState(false)

  const clientURL = useRef('')

  useEffect(() => {
    const found = /\?client=(\S+)/g.exec(decodeURIComponent(document.location.search))
    if (found !== null) {
      clientURL.current = found[1]
    }
  }, [])

  function handleRegister() {
    setShowRegister(true)
  }

  function handleLoggedIn(ticket: string) {
    toast.success('登录成功')
    if (clientURL.current === '') {
      return
    }
    window.location.href = `${clientURL.current}?${encodeURIComponent(`ticket=${ticket}`)}`
  }

  function handleRegisterBack() {
    setShowRegister(false)
  }

  function handleRegistered(data: IPostApiRegister['IRes']['data']) {
    setShowRegister(false)
    setRegisteredData(data)
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
            {
              showRegister ?
                <Register onBack={handleRegisterBack} onRegistered={handleRegistered} /> :
                <Login onRegister={handleRegister} onLoggedIn={handleLoggedIn} registeredData={registeredData} />
            }
          </div>
        </div>
        <footer className='absolute bottom-4 md:bottom-6 text-sm text-zinc-400'>
          <span>
            <span>Copyright © {`${new Date(Date.now()).getFullYear()}`} </span>
            <a target='_blank' href='https://hong97.ltd' rel="noreferrer">hong97.ltd</a>
            <span> | </span>
          </span>
          <span onClick={() => setShowAboutModal(true)} className='cursor-pointer'>About SSO</span>
        </footer>
      </div>

      <Modal
        open={showAboutModal}
        blur
        closeButton
        onClose={() => setShowAboutModal(false)}
      >
        <Modal.Body>
          <div className='flex py-2 w-full justify-between items-center'>
            <div className='text-zinc-900 dark:text-zinc-200  text-sm'>
              <p className='font-medium text-lg'>Single Sign On</p>
              <p className='mb-4'>Build with Next.js</p>
              <a target='_blank' href='https://github.com/hongding0211/sso-fe' className='text-zinc-400 underline' rel="noreferrer">Github Repo</a>
            </div>
            <div className='w-[64px] mr-2'>
              <Image src={logo} layout='intrinsic' alt='logo'/>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

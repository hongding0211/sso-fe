import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Toaster} from "react-hot-toast";
import useDarkMode from 'use-dark-mode'


export default function App({ Component, pageProps }: AppProps) {
  const darkMode = useDarkMode(false)

  return (
    <>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          style: {
            color: darkMode.value ? 'white' : 'black',
            background: darkMode.value ? '#232325' : 'white',
          }
        }}
        containerStyle={{zIndex: 10000}}
      />
    </>
  )
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {Toaster} from "react-hot-toast";
import useDarkMode from 'use-dark-mode'

const lightTheme = createTheme({
  type: 'light',
})
const darkTheme = createTheme({
  type: 'dark',
})

export default function App({ Component, pageProps }: AppProps) {
  const darkMode = useDarkMode(false)

  return (
    <NextUIProvider
      theme={darkMode.value ? darkTheme : lightTheme}
    >
      <Component {...pageProps} />
      <Toaster toastOptions={{
        style: {
          color: darkMode.value ? 'white' : 'black',
          background: darkMode.value ? '#232325' : 'white',
        }
      }}/>
    </NextUIProvider>
  )
}

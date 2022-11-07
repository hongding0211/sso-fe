import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Toaster} from "react-hot-toast";
import useDarkMode from 'use-dark-mode'
import store from "../app/store";
import {Provider} from "react-redux";


export default function App({ Component, pageProps }: AppProps) {
  const darkMode = useDarkMode(false)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster toastOptions={{
        style: {
          color: darkMode.value ? 'white' : 'black',
          background: darkMode.value ? '#232325' : 'white',
        }
      }}/>
    </Provider>
  )
}

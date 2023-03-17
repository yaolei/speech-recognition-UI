import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LayoutView from './compents/layout'

import {Provider} from 'react-redux'
import  store from './action/store'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Provider store={store}>
        <LayoutView />
    </Provider>
    </>
  )
}

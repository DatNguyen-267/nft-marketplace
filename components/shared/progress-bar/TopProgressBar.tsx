import { useEffect } from 'react'
import Router from 'next/router'
import nProgress from 'nprogress'
import React from 'react'
let timer: any
let state: string
let activeRequests = 0
const delay = 250

type Props = {}
const TopProgressBar = (props: Props) => {
  nProgress.configure({ showSpinner: false })
  function load() {
    if (state === 'loading') {
      return
    }
    state = 'loading'
    nProgress.start()
    // timer = setTimeout(function () {
    // }, delay)
  }
  function stop() {
    if (activeRequests > 0) {
      return
    }
    state = 'stop progress'
    clearTimeout(timer)
    nProgress.done()
  }
  useEffect(() => {
    Router.events.on('routeChangeStart', load)
    Router.events.on('routeChangeComplete', stop)
    Router.events.on('routeChangeError', stop)
    return () => {
      Router.events.off('routeChangeStart', load)
      Router.events.off('routeChangeComplete', stop)
      Router.events.off('routeChangeError', stop)
    }
  }, [])
  return null
}
export default TopProgressBar

// const originalFetch = window.fetch
// window.fetch = async function (...args) {
//   if (activeRequests === 0) {
//     load()
//   }

//   activeRequests++

//   try {
//     const response = await originalFetch(...args)
//     return response
//   } catch (error) {
//     return Promise.reject(error)
//   } finally {
//     activeRequests -= 1
//     if (activeRequests === 0) {
//       stop()
//     }
//   }
// }

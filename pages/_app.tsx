import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp

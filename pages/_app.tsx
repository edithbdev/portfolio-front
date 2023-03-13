import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';

const queryClient = new QueryClient;

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Analytics mode={process.env.NODE_ENV === 'production' ? 'production' : 'development'} />
    </QueryClientProvider>
  )
}

export default App
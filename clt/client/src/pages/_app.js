import { Navbar } from '@/components';
import '@/styles/globals.css'
import 'antd/dist/reset.css';
import { AuthProvider } from '../../context/userContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

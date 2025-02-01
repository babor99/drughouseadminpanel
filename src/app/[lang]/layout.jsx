// Next Imports
import { headers } from 'next/headers'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

import { ToastContainer } from 'react-toastify'

// HOC Imports
import TranslationWrapper from '@/hocs/TranslationWrapper'

// Config Imports
import { i18n } from '@configs/i18n'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Drug House',
  description: ''
}

const RootLayout = ({ children, params }) => {
  // Vars
  const headersList = headers()
  const direction = i18n.langDirection[params.lang]

  return (
    <TranslationWrapper headersList={headersList} lang={params.lang}>
      <html id='__next' lang={params.lang} dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            theme="light"
            hideProgressBar={false}
            rtl={false}
            newestOnTop
            closeOnClick
            draggable
            pauseOnHover
          />
          {children}
        </body>
      </html>
    </TranslationWrapper>
  )
}

export default RootLayout

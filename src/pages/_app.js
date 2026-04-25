import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/style.css";
import 'rsuite/dist/rsuite-no-reset.min.css';
import 'react-phone-number-input/style.css'
import 'nprogress/nprogress.css';
import Script from 'next/script'
import Router from 'next/router';
import NProgress from 'nprogress';
import ToastProvider from "@/providers/toast.provider";
import {SessionProvider} from "next-auth/react"
import {AppProvider} from "@/providers/app.provider";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

NProgress.configure({showSpinner: false, speed: 400, minimum: 0.3});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
        },
    },
})

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <div>
              {/*Global site tag (gtag.js) - Google Analytics */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-E448GXQHG8"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-E448GXQHG8');`}
            </Script>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <ToastProvider>
                        <AppProvider>
                            <Component {...pageProps} />
                        </AppProvider>
                    </ToastProvider>
                </QueryClientProvider>
            </SessionProvider>
        </div>
    )
}

export default MyApp;

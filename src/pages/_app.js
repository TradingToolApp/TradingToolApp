// import 'rsuite/dist/rsuite.min.css';
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/style.css";
import 'rsuite/dist/rsuite-no-reset.min.css';
import Script from 'next/script'
import ToastProvider from "@/providers/toast.provider";
import {SessionProvider} from "next-auth/react"
import {AppContext, AppProvider} from "@/providers/app.provider";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {useContext} from "react";

const queryClient = new QueryClient()

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    const {theme} = useContext(AppContext)
    return (
        <>
            {/*  Global site tag (gtag.js) - Google Analytics */}
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
        </>
    )
}

export default MyApp;

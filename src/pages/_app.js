import 'rsuite/dist/rsuite-no-reset.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import Script from 'next/script'
import { SessionProvider } from "next-auth/react"
import { PostProvider } from "@/contextProvider/postContext";
import "../i18n.ts";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      {/*  Global site tag (gtag.js) - Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-E448GXQHG8"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-E448GXQHG8');
      `}
      </Script>
      <SessionProvider session={session}>
        <PostProvider>
          <Component {...pageProps} />
        </PostProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp;

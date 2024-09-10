import 'rsuite/dist/rsuite-no-reset.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script'
import ToastProvider from "@/providers/toast.provider";
import { SessionProvider } from "next-auth/react"
import { AppProvider } from "@/providers/app.provider";
import { AuthorProvider } from "@/providers/author.provider";
import { CategoryProvider } from "@/providers/category.provider";
import { TagProvider } from "@/providers/tag.provider";
import { YoutubeProvider } from "@/providers/widgets/youtube.provider";
import { CommentProvider } from "@/providers/comment.provider";
import "../i18n.ts";

function MyApp( { Component, pageProps: { session, ...pageProps } } ) {
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
                <ToastProvider>
                    <AppProvider>
                        <YoutubeProvider>
                            <CommentProvider>
                                <AuthorProvider>
                                    <CategoryProvider>
                                        <TagProvider>
                                            <Component {...pageProps} />
                                        </TagProvider>
                                    </CategoryProvider>
                                </AuthorProvider>
                            </CommentProvider>
                        </YoutubeProvider>
                    </AppProvider>
                </ToastProvider>
            </SessionProvider>
        </>
    )
}

export default MyApp;

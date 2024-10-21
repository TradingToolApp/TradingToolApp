import React from "react";
import ReactPlayer from 'react-player'
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import style from "./post-style.module.css";

const MarkdownRenderer = ({content}: any) => {
    const playerList = [
        "https://www.youtube.com/",
        "https://soundcloud.com/",
        "https://www.twitch.tv/"
    ];
    const customRenderers = {
        p: ({node, children}: any) => {
            if (node.children[0].tagName === "img") {
                const image = node.children[0];
                return (<p>{children}</p>
                );
            }
            // Return default child if it's not an image
            return <p>{children}</p>;
        },
        a: (props: any) => {
            const {href} = props;
            if (playerList.some((player) => href.startsWith(player))) {
                return <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={href}
                        width='100%'
                        height='100%'
                    />
                </div>
            }
            return (<a {...props}>{props.children}</a>);
        }
    }

    return <Markdown
        components={customRenderers}
        className={style.content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw as any]}
        remarkRehypeOptions={{passThrough: ['link']}}
    >{content}</Markdown>
}
export default MarkdownRenderer;